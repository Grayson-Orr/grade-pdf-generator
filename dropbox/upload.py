import os
import dropbox
access_token = ''
path = 'test-dir'
files = []


def upload_file(file_from, file_to):
    dbx = dropbox.Dropbox(access_token)
    f = open(file_from, 'rb')
    dbx.files_upload(f.read(), file_to)


# r=root, d=directories, f = files
for r, d, f in os.walk(path):
    for file in f:
        files.append(file)

for f in files:
    print(f)
    upload_file(path+'/'+f, '/'+f)
