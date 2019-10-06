import unittest
import json
from dropbox_upload import DropboxUpload


class DropboxUploadTestCase(unittest.TestCase):
    def setUp(self):
        with open('../config.json') as f:
            json_obj = json.load(f)
            access_token = json_obj['dropbox-access-token']
        pdf_files_path = '../pdf/prog-four-pdf/final'
        self.drpbx_upld = DropboxUpload(access_token, pdf_files_path)
        self.files = []

    def test_append_file(self):
        self.drpbx_upld.append_file(self.files)
        self.assertEqual(
            self.files, ['final-results-test-1.pdf', 'final-results-test-2.pdf'])

    def test_upload_single_file(self):
        pass

    def test_upload_multiple_files(self):
        pass

    def tearDown(self):
        self.drpbx_upld = None


if __name__ == '__main__':
    unittest.main()
