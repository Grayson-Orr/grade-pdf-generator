import sys
import json
import matplotlib.pyplot as plt


def label(bar):
    for b in bar:
        height = b.get_height()
        plt.text(b.get_x() + b.get_width() / 2, height,
                 height, ha='center', va='bottom')


json_input = sys.argv[1]
stdnt_cp_total = []
title = {'web-one-grades.json': ['Web 1', 'web-one', 11, 37]}

with open(f'../json/{json_input}', 'r') as f:
    data = json.load(f)

    for i in range(1, title[json_input][2]):
        total = 0
        for d in range(len(data)):
            total += int(data[d]['checkpoint' + str(i)])
        stdnt_cp_total.append(total)

num_of_cps = tuple(i for i in range(1, title[json_input][2]))
plt.title(f'{title[json_input][0]} - Student Completed Checkpoints')
label(plt.bar(num_of_cps, stdnt_cp_total, align='center', alpha=0.5))
plt.xticks(num_of_cps)
plt.yticks(tuple(i for i in range(1, title[json_input][3], 2)))
plt.xlabel('Checkpoint')
plt.ylabel('No. of students')
plt.savefig(f'../public/img/{title[json_input][1]}-cp-completion.png')
