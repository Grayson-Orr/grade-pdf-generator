import os
import json
import dropbox
from termcolor import colored

files = []
access_token = ''


class DropboxUpload():
    def __init__(self, my_access_token, my_path):
        self.my_access_token = my_access_token
        self.my_path = my_path

    def append_file(self, my_files):
        [my_files.append(f) for root, directory, file in os.walk(
            self.my_path) for f in file if '.pdf' in f]

    def upload_single_file(self, my_file_from, my_file_to):
        drpbx = dropbox.Dropbox(self.my_access_token)
        f = open(my_file_from, 'rb')
        drpbx.files_upload(f.read(), my_file_to)

    def upload_multiple_files(self):
        for f in files:
            print(colored('Uploading PDF file to Dropbox.', 'green'))
            self.upload_single_file(f'{self.my_path}/{f}', f'/{f}')
            print(colored('PDF file uploaded to Dropbox.', 'blue'))


def main():
    with open('../config.json') as f:
        json_obj = json.load(f)
        access_token = json_obj['dropbox-access-token']
    pdf_files_path = '../pdf/prog-four-pdf/final'
    drpbx_upld = DropboxUpload(access_token, pdf_files_path)
    drpbx_upld.append_file(files)
    drpbx_upld.upload_multiple_files()


if __name__ == '__main__':
    main()