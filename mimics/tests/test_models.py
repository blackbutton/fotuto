from django.core.exceptions import ValidationError

from fotutils.tests import ModelTestHelper
from mimics.models import Mimic, MimicVar, Rule
from vars.models import Device, Var
from windows.models import Window


class MimicModelTest(ModelTestHelper):
    model = Mimic

    def setUp(self):
        # Mimics require a window
        self.window, create = Window.objects.get_or_create(slug="win1")

    def test_saving_and_retrieving_mimic(self):
        mimic1 = {'name': "First Mimic Name", 'window': self.window}
        mimic2 = {'name': "Second Mimic Name", 'window': self.window}
        # TODO: specify vars
        self.check_saving_and_retrieving_objects(obj1_dict=mimic1, obj2_dict=mimic2)

    def test_require_window(self):
        self.check_require_field(required_field='window', error_key='null')

    def test_string_representation(self):
        self.check_string_representation("Some Mimic Name", name="Some Mimic Name", window=self.window)

    def test_add_graphic_and_rules(self):
        device = Device.objects.create(name="GPS")
        var1 = Var.objects.create(name="Latitude", device=device, slug="lat")
        var2 = Var.objects.create(name="Longitude", device=device, slug="lon")
        mimic_data = {
            'name': "Map Pin",
            'window': self.window,
            'graphic': '<circle r="20" cx="{{ lat }}" cy="{{ lon }}">',
            'width': 100,
            'height': 100
        }
        mimic = Mimic(**mimic_data)
        # Error `lat` and `lon` vars not exist in device yet
        self.assertRaises(ValidationError, mimic.full_clean())
        mimic.save()
        self.assertEqual(Mimic.objects.all().count(), 1)

        MimicVar.objects.create(var=var1, mimic=mimic, min=0, max=400)
        MimicVar.objects.create(var=var2, mimic=mimic, min=0, max=300)
        self.assertEqual(mimic.vars.count(), 2)

        # TODO: Validate javascript code in Rule operation, at least it uses no more than vars names and keywords

        latitude_rule = Rule.objects.create(var=var1, operation="scale=1/10000.0;return min+lat*scale")
        longitude_rule = Rule.objects.create(var=var1, operation="scale=1/10000.0;return min+lon*scale")
        mimic.rules.add(latitude_rule)
        mimic.rules.add(longitude_rule)
        self.assertEqual(mimic.rules.count(), 2)

        # TODO: Validate only vars in mimics rules can be referenced by rule
