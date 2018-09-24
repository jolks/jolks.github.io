---
title: Plot Keras Model in Colaboratory
cwd: .hexo
date: 2018-09-24 14:57:32
tags:
---

Google Colaboratory or in short, Colab provides sufficiently powerful platform to run machine learning projects on Jupyter Notebook. The best thing is we can use Nvidia Tesla K80 GPU for free! However there are some [caveats](https://research.google.com/colaboratory/faq.html).

Just upload a notebook to Google Drive and open it with Colaboratory, yes, as simple as that. We can also create new notebook at the [main page](https://colab.research.google.com/notebooks/welcome.ipynb), which will be saved inside Google Drive `Colab Notebooks` folder.

As of the date of this post, one cannot plot deep learning model via [Keras](https://keras.io/) directly even though Keras is installed by default on Colab.

{% blockquote %}
ImportError: Failed to import `pydot`. Please install `pydot`. For example with `pip install pydot`.

NOTE: If your import is failing due to a missing package, you can
manually install dependencies using either !pip or !apt.

To view examples of installing some common dependencies, click the
"Open Examples" button below.
{% endblockquote %}

The errors encountered and steps taken towards solution can be seen in [Plot Keras Model in Colab Error Reproduced.ipynb](https://colab.research.google.com/drive/1n2HJw3zcZRqWdbXPwC_lkajJ7XRgquFC) notebook.

Looking at just the solution:
```python Plot Keras Model in Colab.ipynb https://colab.research.google.com/drive/1tjGn34WUJIf5lMdwmxxhkL2NcHIBWuiN
# Install dependencies
!apt install graphviz
!pip install pydot pydot-ng
!echo "Double check with Python 3"
!python -c "import pydot"

# Restart runtime to allow Jupyter to know the changes above
import os
os._exit(0)

from keras.models import Model
from keras.layers import Input, Dense
from keras.utils import plot_model

# Multi-layer neural networks
inputs = Input(shape=(10,))
hidden1 = Dense(10, activation='relu')(inputs)
hidden2 = Dense(30, activation='relu')(hidden1)
hidden3 = Dense(10, activation='relu')(hidden2)
output = Dense(1, activation='sigmoid')(hidden3)
model = Model(inputs=inputs, outputs=output)

# Model summary
print(model.summary())

# Plot model graph
plot_model(model, show_shapes=True, show_layer_names=True, to_file='model.png')
from IPython.display import Image
Image(retina=True, filename='model.png')
```
![Keras model graph plot sample](/images/plot_keras_model.png)
