const container = document.getElementById('bar-container');
let barArray = [];

// Generate bars for visualization
function generateBars() {
  const numBars = document.getElementById('num-bars').value;
  container.innerHTML = ''; // Clear previous bars
  barArray = [];
  
  for (let i = 0; i < numBars; i++) {
    const value = Math.floor(Math.random() * 100) + 1;
    barArray.push(value);

    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${value * 3}px`;
    bar.style.width = `${100 / numBars}%`;

    container.appendChild(bar);
  }
}

// Helper function to update bars
function updateBars(index1, index2, color = 'red') {
  const bars = document.querySelectorAll('.bar');
  bars[index1].style.backgroundColor = color;
  bars[index2].style.backgroundColor = color;

  setTimeout(() => {
    bars[index1].style.backgroundColor = '#17a2b8';
    bars[index2].style.backgroundColor = '#17a2b8';
  }, 200);
}

// Bubble Sort Algorithm Visualization
async function bubbleSort() {
  const bars = document.querySelectorAll('.bar');
  
  for (let i = 0; i < barArray.length - 1; i++) {
    for (let j = 0; j < barArray.length - i - 1; j++) {
      updateBars(j, j + 1, 'orange');
      await new Promise(resolve => setTimeout(resolve, 200)); // Pause

      if (barArray[j] > barArray[j + 1]) {
        // Swap values
        let temp = barArray[j];
        barArray[j] = barArray[j + 1];
        barArray[j + 1] = temp;

        // Update heights
        bars[j].style.height = `${barArray[j] * 3}px`;
        bars[j + 1].style.height = `${barArray[j + 1] * 3}px`;
      }
    }
  }
}

// Selection Sort Visualization
async function selectionSort() {
  const bars = document.querySelectorAll('.bar');
  
  for (let i = 0; i < barArray.length - 1; i++) {
    let minIndex = i;
    
    for (let j = i + 1; j < barArray.length; j++) {
      updateBars(j, minIndex, 'orange');
      await new Promise(resolve => setTimeout(resolve, 200));

      if (barArray[j] < barArray[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      let temp = barArray[i];
      barArray[i] = barArray[minIndex];
      barArray[minIndex] = temp;

      bars[i].style.height = `${barArray[i] * 3}px`;
      bars[minIndex].style.height = `${barArray[minIndex] * 3}px`;
    }
  }
}

// Insertion Sort Visualization
async function insertionSort() {
  const bars = document.querySelectorAll('.bar');

  for (let i = 1; i < barArray.length; i++) {
    let current = barArray[i];
    let j = i - 1;

    while (j >= 0 && barArray[j] > current) {
      updateBars(j, j + 1, 'orange');
      await new Promise(resolve => setTimeout(resolve, 200));

      barArray[j + 1] = barArray[j];
      bars[j + 1].style.height = `${barArray[j + 1] * 3}px`;
      j--;
    }
    barArray[j + 1] = current;
    bars[j + 1].style.height = `${current * 3}px`;
  }
}

// Initial Bars
generateBars();