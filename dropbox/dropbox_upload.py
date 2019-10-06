import os
import json
import dropbox

files = []


class DropBoxUpload():
    def __init__(self, my_access_token, my_path):
        self.my_access_token = my_access_token
        self.my_path = my_path

    def append_file(self, my_file):
        [my_file.append(f) for root, directory, file in os.walk(
            self.my_path) for f in file if '.txt' in f]

    def upload_single_file(self, my_file_from, my_file_to):
        drpbx = dropbox.Dropbox(self.my_access_token)
        f = open(my_file_from, 'rb')
        drpbx.files_upload(f.read(), my_file_to)

    def upload_multiple_files(self):
        for f in files:
            print(f)
            # self.upload_single_file(f'{self.my_path}/{f}', f'/{f}')


def main():
    my_access_token = 'Wp6DH31IfYAAAAAAAAAAvCz_33J6QWk8LJfuZWdTA_3Ay1QRIXaWgejnwz3rHL4X'
    txt_files_path = 'txt-files'
    drpbx_upld = DropBoxUpload(my_access_token, txt_files_path)
    drpbx_upld.append_file(files)
    print(files)
    drpbx_upld.upload_multiple_files()


if __name__ == '__main__':
    main()
