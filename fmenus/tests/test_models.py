from fmenus.models import MenuItem
from fotutils.tests import ModelTestHelper


class MimicModelTest(ModelTestHelper):
    model = MenuItem

    def setUp(self):
        super(MimicModelTest, self).setUp()
        self.menu_item_1_data = {'position': 'view', 'text': 'Menu1'}

    def test_saving_and_retrieving_menu(self):
        menu_item_2_data = {'position': 'view', 'text': 'Menu2'}
        # TODO: specify vars
        self.check_saving_and_retrieving_objects(obj1_dict=self.menu_item_1_data, obj2_dict=menu_item_2_data)

    def test_string_representation(self):
        self.check_string_representation("View:Menu1", **self.menu_item_1_data)