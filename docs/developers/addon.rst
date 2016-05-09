============================
Guide for Add-ons developers
============================

You can add new functions to Fotuto. We called it **add-ons** and its are regular Django_ apps.

To integrate your add-on to Fotuto, you need to add the name of your app to the setting ``ADDITIONAL_APPS`` in the
``settings_local.py`` file. Then Fotuto will detects and use automatically ``urls`` module in your add-on.

.. note:: The filesystem path to your add-on need to be in system var :envvar:`PYTHON_PATH` or your add-on need to
   be installed on the same python `virtual environment`_ used by Fotuto.

Menus items
===========
To add menu items, add fixtures to add/overwrite fotuto default :ref:`menu items <developers-fotuto-menu-items>`.

Filters
=======
Fotuto provide some AngularJS_ filters to use in the SPA. All shared filters can be found in :file:`static/spa/shared/fotuto.filters.js`.

Filter getItem
--------------
Used to get an item from a list given it's `slug` value. i.e. Given a list of :class:`vars.models.Vars` to obtain the
var with ``slug``=*door-sensor*::

   {{ var_list | getItem:'door-sensor' }}

.. _Django: http://djangoproject.com
.. _virtual environment: http://pypi.python.org/pypi/virtualenv
.. _AngularJS: http://angularjs.org