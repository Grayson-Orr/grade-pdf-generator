import unittest
from dropbox.dropbox_upload import *


class DropBoxUploadTestCase(unittest.TestCase):
    def setUp(self):
        my_access_token = 'Wp6DH31IfYAAAAAAAAAAvCz_33J6QWk8LJfuZWdTA_3Ay1QRIXaWgejnwz3rHL4X'
        txt_files_path = 'txt-files'
        self.drpbx_upld = DropBoxUpload(my_access_token, txt_files_path)

    def tearDown(self):
        self.drpbx_upld.dispose()


if __name__ == '__main__':
    unittest.main()
