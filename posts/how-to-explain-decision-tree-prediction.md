Decision Tree is a white box model because it is intuitive to interpret why the model gives output or prediction from the inputs. It is also a Symbolic AI method in which it provides "symbolic" (human-readable) representations of logic or rule.

Using Iris flower dataset, we build a decision tree classifier to classify input of 4 features, sepal length (cm), sepal width (cm), petal length (cm), and petal width (cm) into 3 classes of Iris flower species consisting of `setosa`, `versicolor` and `virginica`.

Assuming the trained decision tree classifier looks like below.

![Decision Tree Model](/images/decision_tree_model.png)

Let's pick 1 input from test dataset for example,

sepal length (cm) | sepal width (cm) | petal length (cm)| and petal width (cm)
----------------- | ---------------- | ---------------- | --------------------
6.2 | 3.4 | 5.4 | 2.3

The model predicts the input to be `virginica`.

How do we explain the prediction? Why is it classified as `virginica`?

Since there are not many features, we can manually traverse through the decision tree model figure above to explain the prediction.

This is not scalable once we have many features to look at. Fortunately, we can programmatically explain the prediction.

The easiest way is to just display the decision path.

```python
decision_path = tree_clf.decision_path(selected_input)
print("Rough display of decision path:\n", decision_path)

"""
Rough display of decision path:
   (0, 0)	1
  (0, 2)	1
  (0, 12)	1
  (0, 16)	1
"""
```
The second element of each tuple above represents the node ID traversed to reach the prediction result i.e. node #0 -> node #2 -> node #12 -> node #16.

To explain in more detail, we can dig deeper and compare each rule and input value side by side.

```python
level_length = len(decision_path.indices)
i = 1
for node_id in decision_path.indices:
  # Ignore last level because it is the last node
  # without decision criteria or rule
  if i < level_length:
    col_name = iris_data.feature_names[tree_clf.tree_.feature[node_id]]
    threshold_value = tree_clf.tree_.threshold[node_id]
    rule = "{} <= {}".format(col_name, threshold_value)
    print("node#{}:".format(node_id), rule, selected_input_df[col_name].values)
  i = i + 1

"""
node#0: petal length (cm) <= 2.599999964237213 [5.4]
node#2: petal width (cm) <= 1.75 [2.3]
node#12: petal length (cm) <= 4.8500001430511475 [5.4]
"""
```
In node #0, input value of 5.4 cm petal length results in `false` decision for the rule `petal length (cm) <= 2.599999964237213`, which leads to node #2.

In node #2, input value of 2.3 cm petal width results in `false` decision for the rule `petal width (cm) <= 1.75`, which leads to node #12.

In node #12, input value of 5.4 cm petal length results in `false` decision for the rule `petal length (cm) <= 4.8500001430511475`, which leads to node #16.

In node #16, there is no rule or decision criteria, it is the last node that gives the prediction result, `virginica`.

The notebook below demonstrates the implementation steps. Although the decision tree model may not remain the same, the prediction can always be explained.

# References
1. https://scikit-learn.org/stable/modules/generated/sklearn.tree.DecisionTreeClassifier.html#sklearn.tree.DecisionTreeClassifier.decision_path
2. https://github.com/scikit-learn/scikit-learn/blob/master/sklearn/tree/export.py. See `node_to_str` method.
3. https://en.wikipedia.org/wiki/Symbolic_artificial_intelligence
