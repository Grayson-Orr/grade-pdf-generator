
import sys
import json
import matplotlib.pyplot as plt
import numpy as np

json_input = sys.argv[1]
asgnmt_total_a = []
asgnmt_total_b = []

with open(f'../json/{json_input}', 'r') as f:
    data = json.load(f)

    for d in range(len(data)):
        total = float(data[d]['a1total'])
        if data[d]['stream'] == 'a':
            asgnmt_total_a.append(total)
        else:
            asgnmt_total_b.append(total)

print(asgnmt_total_a, len(asgnmt_total_a))
print(asgnmt_total_b, len(asgnmt_total_b))

N = 10
g1 = (10, 10)
g2 = (16, 16)

data = (g1, g2)
colors = ("red", "green")
groups = ("Stream A", "Stream B")

# Create plot
fig = plt.figure()
ax = fig.add_subplot(1, 1, 1, facecolor="1.0")

for data, color, group in zip(data, colors, groups):
    x, y = data
    ax.scatter(x, y, alpha=0.8, c=color, edgecolors='none', s=30, label=group)

plt.title('Matplot scatter plot')
plt.legend(loc=2)
plt.savefig(f'test.png')
