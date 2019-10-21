import sys
import json
import matplotlib.pyplot as plt

json_input = sys.argv[1]
stdnt_cp_total = []
stdnt_cp_count = []

title = {'prog-four-grades.json': ['Programming 4', 'prog-four', 25, 40],
         'web-one-grades.json': ['Web 1', 'web-one', 11, 26]}

with open(f'../json/{json_input}', 'r') as f:
    data = json.load(f)

    for d in range(len(data)):
        total = int(data[d]['total'])
        stdnt_cp_total.append(total)

    for c in range(1, title[json_input][2]):
        count = stdnt_cp_total.count(c)
        stdnt_cp_count.append(count)

num_of_cps = tuple(i for i in range(1, title[json_input][2]))
plt.title(f'{title[json_input][0]} - Student Completed Checkpoints')
plt.bar(num_of_cps, stdnt_cp_count, align='center', alpha=0.5)
plt.xticks(num_of_cps)
plt.yticks(tuple(i for i in range(1, title[json_input][3], 2)))
plt.xlabel('No. of completed checkpoints')
plt.ylabel('No. of students')
plt.savefig(f'../public/img/{title[json_input][1]}-cp-completion.png')
