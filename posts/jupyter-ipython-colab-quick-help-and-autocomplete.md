---
title: 'Jupyter, IPython, Colab Quick Help and Autocomplete'
date: 2019-05-04 06:28:07
---

How to autocomplete and quickly access help or documentation in Python?

For interactive shell, you can use IPython.

For interactive notebook, you can use Jupyter or Colab.

* To autocomplete, just press `tab` key [[1]](#References). A notable difference in Colab is pressing `tab` key after typing an open parenthesis for a method or a class will show its documentation [[3]](#References).
* To quickly access documentation, type **?** before or after an object and press the *run* key [[2, 3]](#References).
* To quickly access documentation including the source code, type **??** before or after an object and press the *run* key [[2]](#References).

The *run* key for IPython, Jupyter and Colab:

IPython | Jupyter | Colab
--------|---------|--------
`enter` | `shift`+`enter` | `shift`+`enter`


Historically speaking, [Colab](https://colab.research.google.com) comes from [Jupyter](https://en.wikipedia.org/wiki/Project_Jupyter) and Jupyter comes from [IPython (Interactive Python)](https://en.wikipedia.org/wiki/IPython).

```
IPython -> Jupyter -> Colab
```

# References
1. https://ipython.readthedocs.io/en/stable/interactive/reference.html#command-line-completion
2. https://ipython.readthedocs.io/en/stable/interactive/reference.html#dynamic-object-information
3. https://colab.research.google.com/notebooks/basic_features_overview.ipynb#scrollTo=d4L9TOP9QSHn
