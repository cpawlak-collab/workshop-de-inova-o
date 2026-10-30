// Configuração global de fontes e cores do Chart.js
Chart.defaults.color = '#94a3b8';
Chart.defaults.font.family = "'Inter', sans-serif";

// Base de Dados do Evento Corporativo
const eventData = {
  categories: ['Aluguel do Espaço', 'Catering & Buffet', 'Palestrantes', 'Marketing Digital', 'Brindes & Kit', 'Audiovisual'],
  previsto: [20000, 12500, 15000, 4000, 3000, 4000],
  realizado: [20000, 10800, 12000, 4500, 2500, 3800],
  timelineLabels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  fluxoCaixa: [5000, 12000, 22000, 35000, 48000, 58500],
  satisfacaoMetricas: ['Infraestrutura', 'Conteúdo', 'Networking', 'Comida', 'Organização'],
  satisfacaoNotas: [92, 88, 95, 78, 85],
  inscricoesMes: [20, 45, 80, 130, 190, 250],
  metaInscricoes: [30, 60, 100, 150, 200, 250],
  horasEquipe: [120, 90, 60, 150, 80]
};

const palette = ['#38bdf8', '#4ade80', '#c084fc', '#fb923c', '#f43f5e', '#a855f7'];

// Utility para formatação de moeda
const formatBRL = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

// 1. Gráfico de Rosca (Doughnut) - Composição
new Chart(document.getElementById('chartDoughnut'), {
  type: 'doughnut',
  data: {
    labels: eventData.categories,
    datasets: [{
      data: eventData.previsto,
      backgroundColor: palette,
      borderWidth: 0
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right' },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.label}: ${formatBRL(ctx.raw)}`
        }
      }
    }
  }
});

// 2. Gráfico de Barras Agrupadas - Previsto vs Realizado
new Chart(document.getElementById('chartComparison'), {
  type: 'bar',
  data: {
    labels: eventData.categories,
    datasets: [
      {
        label: 'Previsto',
        data: eventData.previsto,
        backgroundColor: '#38bdf8',
        borderRadius: 4
      },
      {
        label: 'Realizado',
        data: eventData.realizado,
        backgroundColor: '#4ade80',
        borderRadius: 4
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.dataset.label}: ${formatBRL(ctx.raw)}`
        }
      }
    },
    scales: {
      y: { ticks: { callback: (val) => `R$ ${val / 1000}k` } }
    }
  }
});

// 3. Gráfico de Linha de Área - Fluxo Temporal
new Chart(document.getElementById('chartTimeline'), {
  type: 'line',
  data: {
    labels: eventData.timelineLabels,
    datasets: [{
      label: 'Aporte Acumulado',
      data: eventData.fluxoCaixa,
      borderColor: '#c084fc',
      backgroundColor: 'rgba(192, 132, 252, 0.15)',
      fill: true,
      tension: 0.4,
      pointRadius: 5
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { ticks: { callback: (val) => `R$ ${val / 1000}k` } }
    }
  }
});

// 4. Gráfico de Radar - Índice de Satisfação/Aproveitamento
new Chart(document.getElementById('chartRadar'), {
  type: 'radar',
  data: {
    labels: eventData.satisfacaoMetricas,
    datasets: [{
      label: 'Aprovação (%)',
      data: eventData.satisfacaoNotas,
      borderColor: '#fb923c',
      backgroundColor: 'rgba(251, 146, 60, 0.2)',
      pointBackgroundColor: '#fb923c'
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: { stepSize: 20 },
        grid: { color: '#334155' }
      }
    }
  }
});

// 5. Gráfico Combinado (Misto) - Inscrições Realizadas vs Meta
new Chart(document.getElementById('chartRegistrations'), {
  type: 'bar',
  data: {
    labels: eventData.timelineLabels,
    datasets: [
      {
        type: 'bar',
        label: 'Inscrições Confirmadas',
        data: eventData.inscricoesMes,
        backgroundColor: '#38bdf8',
        borderRadius: 4
      },
      {
        type: 'line',
        label: 'Meta Prevista',
        data: eventData.metaInscricoes,
        borderColor: '#f43f5e',
        borderDash: [5, 5],
        fill: false
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false
  }
});

// 6. Gráfico Polar Area - Distribuição de Horas de Trabalho por Setor
new Chart(document.getElementById('chartPolar'), {
  type: 'polarArea',
  data: {
    labels: ['Gestão', 'Logística', 'Design/Mídia', 'Atendimento', 'Técnica'],
    datasets: [{
      data: eventData.horasEquipe,
      backgroundColor: palette
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right' }
    },
    scales: {
      r: { grid: { color: '#334155' } }
    }
  }
});
