===============================
Guide for extensions developers
===============================

You can add new functions to Fotuto. We called it **extensions** and they are regular Django_ apps.

To integrate your extension to Fotuto, you need to add the name of your app to the setting ``ADDITIONAL_APPS`` in the
``settings_local.py`` file. Then Fotuto will detects and use automatically ``urls`` module in your extension.

.. note:: The filesystem path to your extension need to be in system var ``PYTHON_PATH`` or your extension need to be
   installed on the same python `virtual environment`_ used by Fotuto.

.. _Django: http://djangoproject.com
.. _virtual environment: http://pypi.python.org/pypi/virtualenv
