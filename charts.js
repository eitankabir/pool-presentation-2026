const Charts = (() => {
  const instances = {};

  const DEFAULTS = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { font: { family: 'Assistant', size: 19 }, color: '#ffffff' },
      },
      tooltip: {
        titleFont: { family: 'Assistant', size: 17 },
        bodyFont:  { family: 'Assistant', size: 16 },
      },
    },
    scales: {
      x: { ticks: { font: { family: 'Assistant', size: 16 }, color: '#b0c4d8' }, grid: { color: 'rgba(255,255,255,0.07)' } },
      y: { ticks: { font: { family: 'Assistant', size: 16 }, color: '#b0c4d8' }, grid: { color: 'rgba(255,255,255,0.07)' } },
    },
  };

  function _create(id, config) {
    const canvas = document.getElementById(id);
    if (!canvas) return null;
    if (instances[id]) instances[id].destroy();
    const merged = _deepMerge({ options: DEFAULTS }, config);
    instances[id] = new Chart(canvas, merged);
    return instances[id];
  }

  function _createExpensePie() {
    _create('expensePie', {
      type: 'doughnut',
      data: {
        labels: Data.budget.expenseLabels,
        datasets: [{
          data: Data.budget.expenseValues,
          backgroundColor: Data.budget.expenseColors,
          borderColor: 'rgba(10,22,40,0.6)',
          borderWidth: 3,
          hoverOffset: 18,
        }],
      },
      options: {
        cutout: '54%',
        plugins: {
          legend: { display: false },
          tooltip: {
            rtl: true,
            textDirection: 'rtl',
            callbacks: {
              label: ctx => ` ${ctx.label}: ${ctx.parsed.toLocaleString('he-IL')}₪`,
            },
          },
        },
        animation: { animateRotate: true, animateScale: true, duration: 1100 },
      },
    });
  }

  function onSlideChange(slideIndex) {
    void slideIndex;
  }

  function destroyAll() {
    Object.values(instances).forEach(c => c.destroy());
    Object.keys(instances).forEach(k => delete instances[k]);
  }

  function _deepMerge(target, source) {
    const out = Object.assign({}, target);
    for (const key of Object.keys(source)) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        out[key] = _deepMerge(target[key] ?? {}, source[key]);
      } else {
        out[key] = source[key];
      }
    }
    return out;
  }

  return { create: _create, onSlideChange, destroyAll };
})();
