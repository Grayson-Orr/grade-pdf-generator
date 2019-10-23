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
stream_a_mark = []
stream_b_mark = []
title = {'web-one-grades.json': ['Web 1', 'web-one', 11, 37]}

with open(f'../json/{json_input}', 'r') as f:
    data = json.load(f)

    for idx in range(1, 4):
        for d in range(len(data)):
            if data[d]['stream'] == 'a':
                stream_a_mark.append(float(data[d]['a1mark' + str(idx)]))
            else:
                stream_b_mark.append(float(data[d]['a1mark' + str(idx)]))

stream_a = list(split_arr(stream_a_mark, 20))
stream_b = list(split_arr(stream_b_mark, 16))

num_of_bars = np.arange(2)
width = 0.25
fig = plt.figure(figsize=(8, 8))
axis = fig.add_subplot(111)
x_vals = [round(sum(stream_a[0]) / len(stream_a[0]), 3),
          round(sum(stream_b[0]) / len(stream_b[0]), 3)]
rect_one = axis.bar(num_of_bars, x_vals, width, color='r')
y_vals = [round(sum(stream_a[1]) / len(stream_a[1]), 3),
          round(sum(stream_b[1]) / len(stream_b[1]), 3)]
rect_two = axis.bar(num_of_bars + width, y_vals, width, color='g')
z_vals = [round(sum(stream_a[2]) / len(stream_a[2]), 3),
          round(sum(stream_b[2]) / len(stream_b[2]), 3)]
rect_three = axis.bar(num_of_bars + width * 2, z_vals, width, color='b')
axis.set_ylabel('Scores')
axis.set_yticks(tuple(i for i in range(1, 11)))
axis.set_xticks(num_of_bars + width)
axis.set_xticklabels(('Stream A', 'Stream B'))
axis.legend((rect_one[0], rect_two[0], rect_three[0]),
            ('Requirements', 'Code Quality', 'Best Practices'))
label(rect_one)
label(rect_two)
label(rect_three)
plt.show()
