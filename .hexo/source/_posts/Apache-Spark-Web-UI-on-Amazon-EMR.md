---
title: Apache Spark Web UI on Amazon EMR
cwd: .hexo
date: 2018-09-22 20:19:46
tags:
---
[Apache Spark](https://spark.apache.org/) is a fast and general engine for large-scale data processing.

It has a [web UI](https://spark.apache.org/docs/latest/monitoring.html) that we can use to monitor each Spark job in detail. This is useful for debugging and optimization.

Coupled with [Apache Zeppelin](https://zeppelin.apache.org/), we can have a very interactive web-based notebook environment for Apache Spark, just like [Jupyter Notebook](http://jupyter.org/).

Thanks to [Amazon EMR](https://aws.amazon.com/emr/), we can setup and run a Spark cluster with Zeppelin conveniently without doing it from scratch.

After doing either [local port forwarding or dynamic port forwarding](https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-web-interfaces.html) to access the Spark web UI at port 4040, we encounter a broken HTML page.

![Broken Spark Web UI](/images/spark_web_ui_broken.png)

`172.31.0.147` is the internal IP of the Spark master instance.

Before we go into the details or for those who want to skip the details, just read the short version below.

### Short Version
At runtime on Zeppelin notebook or Spark job Scala code, update system properties `spark.ui.proxyBase` to empty string.
```scala
sys.props.update("spark.ui.proxyBase", "")
```
Reload `http://172.31.0.147:4040` page.

### Long Version
Why is Spark web UI not displaying correctly? How to fix it? Let's look at the page source to find out.
```html
<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
<link rel="stylesheet" href="/proxy/application_1537612610972_0001/static/bootstrap.min.css" type="text/css" />
<link rel="stylesheet" href="/proxy/application_1537612610972_0001/static/vis.min.css" type="text/css" />
<link rel="stylesheet" href="/proxy/application_1537612610972_0001/static/webui.css" type="text/css" />
<link rel="stylesheet" href="/proxy/application_1537612610972_0001/static/timeline-view.css" type="text/css" />
<script src="/proxy/application_1537612610972_0001/static/sorttable.js"></script>
<script src="/proxy/application_1537612610972_0001/static/jquery-1.11.1.min.js"></script>
<script src="/proxy/application_1537612610972_0001/static/vis.min.js"></script>
<script src="/proxy/application_1537612610972_0001/static/bootstrap-tooltip.js"></script>
<script src="/proxy/application_1537612610972_0001/static/initialize-tooltips.js"></script>
<script src="/proxy/application_1537612610972_0001/static/table.js"></script>
<script src="/proxy/application_1537612610972_0001/static/additional-metrics.js"></script>
<script src="/proxy/application_1537612610972_0001/static/timeline-view.js"></script>
<script src="/proxy/application_1537612610972_0001/static/log-view.js"></script>
<script src="/proxy/application_1537612610972_0001/static/webui.js"></script>
<script>
    setUIRoot('/proxy/application_1537612610972_0001')
</script>
```
Going to `http://172.31.0.147:4040/proxy/application_1537612610972_0001/static/bootstrap.min.css` will redirect us back to `http://172.31.0.147:4040/jobs/`.

However going to `http://172.31.0.147:4040/static/bootstrap.min.css` will unveil the actual file.

We have to find a way to get rid of `/proxy/application_1537612610972_0001`.

At this point, we can roughly guess it is because of a reverse proxy due to the `proxy` string inside `/proxy/application_1537612610972_0001`. To confirm, let's go to the Spark source code on GitHub and search for `bootstrap.min.css`.

![Search Spark Source Code](/images/search_spark_src.png)

Eventually this will lead us to `UIUtils.scala`. To match the Spark version that we are using, select `v2.3.1` tag.

```scala UIUtils.scala https://github.com/apache/spark/blob/v2.3.1/core/src/main/scala/org/apache/spark/ui/UIUtils.scala#L151-L179
// Yarn has to go through a proxy so the base uri is provided and has to be on all links
  def uiRoot: String = {
    // SPARK-11484 - Use the proxyBase set by the AM, if not found then use env.
    sys.props.get("spark.ui.proxyBase")
      .orElse(sys.env.get("APPLICATION_WEB_PROXY_BASE"))
      .getOrElse("")
  }

  def prependBaseUri(basePath: String = "", resource: String = ""): String = {
    uiRoot + basePath + resource
  }

  def commonHeaderNodes: Seq[Node] = {
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <link rel="stylesheet" href={prependBaseUri("/static/bootstrap.min.css")} type="text/css"/>
    <link rel="stylesheet" href={prependBaseUri("/static/vis.min.css")} type="text/css"/>
    <link rel="stylesheet" href={prependBaseUri("/static/webui.css")} type="text/css"/>
    <link rel="stylesheet" href={prependBaseUri("/static/timeline-view.css")} type="text/css"/>
    <script src={prependBaseUri("/static/sorttable.js")} ></script>
    <script src={prependBaseUri("/static/jquery-1.11.1.min.js")}></script>
    <script src={prependBaseUri("/static/vis.min.js")}></script>
    <script src={prependBaseUri("/static/bootstrap-tooltip.js")}></script>
    <script src={prependBaseUri("/static/initialize-tooltips.js")}></script>
    <script src={prependBaseUri("/static/table.js")}></script>
    <script src={prependBaseUri("/static/additional-metrics.js")}></script>
    <script src={prependBaseUri("/static/timeline-view.js")}></script>
    <script src={prependBaseUri("/static/log-view.js")}></script>
    <script src={prependBaseUri("/static/webui.js")}></script>
    <script>setUIRoot('{UIUtils.uiRoot}')</script>
  }
```
Comparing code snippet and HTML snippet above, `UIUtils.uiRoot = /proxy/application_1537612610972_0001`. The 1st line comment in the code snippet confirms that there is [YARN reverse proxy](https://hadoop.apache.org/docs/current/hadoop-yarn/hadoop-yarn-site/WebApplicationProxy.html) that protects Spark cluster from web-based attacks. [YARN](https://spark.apache.org/docs/latest/running-on-yarn.html) is a resource manager that allow us to run Spark in cluster mode.

Also, looking at `http://172.31.0.147:4040/environment/` page (Caution: We have to manually go to the link. Clicking the `Environment` link will just redirect us back to homepage), we can see that `spark.ui.filters` is `org.apache.hadoop.yarn.server.webproxy.amfilter.AmIpFilter`. More information can be found inside the [doc](https://spark.apache.org/docs/latest/configuration.html).

We cannot set `spark.ui.proxyBase` inside `spark-defaults.conf` file or `APPLICATION_WEB_PROXY_BASE` Spark environment variable because the proxy will overwrite everything.

Assuming that we want to avoid configuring the proxy or we do not have the permission to do so, there is a solution that we can take.

On your Zeppelin notebook or Spark job Scala code, update system properties `spark.ui.proxyBase` to empty string.

```scala
sys.props.update("spark.ui.proxyBase", "")
```

![Update System Properties](/images/zeppelin_update_sys_prop_spark_ui_proxybase.png)

Reloading `http://172.31.0.147:4040` page will show the actual web UI.

![Actual Spark Web UI](/images/actual_spark_web_ui.png)

Now we can start having fun doing real work on Spark cluster!






