import sys
import json
import matplotlib.pyplot as plt
import numpy as np


def split_arr(list, num):
    for idx in range(0, len(list), num):
        yield list[idx:idx + num]


def label(bar):
    for b in bar:
        height = b.get_height()
        plt.text(b.get_x() + b.get_width() / 2, height,
                 height, ha='center', va='bottom')


json_input = sys.argv[1]
comp_one = []
title = {'web-one-grades.json': ['Web 1', 'web-one', 11, 37]}

with open(f'../json/{json_input}', 'r') as f:
    data = json.load(f)

    for idx in range(1, 4):
        for d in range(len(data)):
            comp_one.append(float(data[d]['a1mark' + str(idx)]))

components = list(split_arr(comp_one, title[json_input][3] - 1))

num_of_bars = np.arange(1)
width = 0.10
fig = plt.figure(figsize=(5, 5))
plt.title(f'{title[json_input][0]} - Average Score per Component')
axis = fig.add_subplot(111)
x_vals = [round(sum(components[0]) / len(components[0]), 3)]
rect_one = axis.bar(num_of_bars, x_vals, width, color='r')
y_vals = [round(sum(components[1]) / len(components[1]), 3)]
rect_two = axis.bar(num_of_bars + width, y_vals, width, color='g')
z_vals = [round(sum(components[2]) / len(components[2]), 3)]
rect_three = axis.bar(num_of_bars + width * 2, z_vals, width, color='b')
axis.set_ylabel('Scores')
axis.set_yticks(tuple(idx for idx in range(1, 11)))
axis.set_xticks(num_of_bars + width)
axis.set_xticklabels(('Cohort',))
axis.legend((rect_one[0], rect_two[0], rect_three[0]),
            ('Requirements', 'Code Quality', 'Best Practices'))
label(rect_one)
label(rect_two)
label(rect_three)
plt.savefig(f'../public/img/{title[json_input][1]}-assignment-completion.png')
