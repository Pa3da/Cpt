function showSection(sectionId) {
    document.getElementById('mainMenu').classList.add('hidden');
    document.getElementById('addSection').classList.add('hidden');
    document.getElementById('subtractSection').classList.add('hidden');
    document.getElementById('recordSection').classList.add('hidden');
    document.getElementById(sectionId).classList.remove('hidden');
}

function fetchNumber() {
    fetch('../php/update.php')
        .then(response => response.json())
        .then(data => {
            const currentNumber = data.number;
            document.getElementById('progressDisplay').textContent = `${currentNumber}/1000`;
            updateButtonStates(currentNumber);
        });
}

function changeNumber(change) {
    const reason = document.getElementById('reason').value;
    fetch('update.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `change=${change}&reason=${encodeURIComponent(reason)}`
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('progressDisplay').textContent = `${data.number}/1000`;
        });
}

function customChange(multiplier) {
    const value = document.getElementById('customAdd').value;
    const reason = document.getElementById('reason').value;
    changeNumber(multiplier * value);
}

function updateReason() {
    const logId = document.getElementById('logId').value;
    const newReason = document.getElementById('newReason').value;

    fetch('update.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `log_id=${logId}&reason=${encodeURIComponent(newReason)}`
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);  // 显示更新成功的信息
        });
}
function loadRecords() {
    fetch('get_records.php')
        .then(response => response.json())
        .then(data => {
            const recordList = document.getElementById('recordList');
            recordList.innerHTML = ''; // 清空现有记录
            data.forEach(record => {
                const recordDiv = document.createElement('div');
                recordDiv.className = 'bg-gray-100 p-4 rounded-lg shadow-md';

                const content = `
                    <div>变动: ${record.change_value}</div>
                    <div>原因: ${record.reason}</div>
                    <div>日期: ${new Date(record.created_at).toLocaleString()}</div>
                    <input type="text" placeholder="修改原因" class="w-full mt-2 p-2 border border-gray-300 rounded" id="reason-${record.id}">
                    <button class="bg-blue-500 text-white py-1 px-3 rounded mt-2" onclick="updateRecordReason(${record.id})">修改原因</button>
                `;
                recordDiv.innerHTML = content;
                recordList.appendChild(recordDiv);
            });
        });
}

function updateRecordReason(recordId) {
    const newReason = document.getElementById(`reason-${recordId}`).value;
    fetch('update.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `log_id=${recordId}&reason=${encodeURIComponent(newReason)}`
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);  // 显示更新成功的信息
            loadRecords();  // 重新加载记录
        });
}
function loadRecords() {
    fetch('get_records.php')
        .then(response => response.json())
        .then(data => {
            const recordList = document.getElementById('recordList');
            recordList.innerHTML = ''; // 清空现有记录
            data.forEach(record => {
                const recordDiv = document.createElement('div');
                recordDiv.className = 'bg-gray-100 p-4 rounded-lg shadow-md';

                const content = `
                <div>变动: ${record.change_value}</div>
                <div>原因: <span id="reason-display-${record.id}">${record.reason}</span></div>
                <div>日期: ${new Date(record.created_at).toLocaleString()}</div>
                <input type="text" placeholder="修改原因" class="w-full mt-2 p-2 border border-gray-300 rounded" id="reason-${record.id}">
                <button class="bg-blue-500 text-white py-1 px-3 rounded mt-2" onclick="updateRecordReason(${record.id})">修改原因</button>
            `;
                recordDiv.innerHTML = content;
                recordList.appendChild(recordDiv);
            });
        });
}

function updateRecordReason(recordId) {
    const newReasonInput = document.getElementById(`reason-${recordId}`);
    const newReason = newReasonInput.value;

    if (!newReason.trim()) {
        alert("请填写新的原因");
        return;
    }

    fetch('update.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `log_id=${recordId}&reason=${encodeURIComponent(newReason)}`
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);  // 显示更新成功的信息
            document.getElementById(`reason-display-${recordId}`).textContent = newReason;  // 更新显示的原因
            newReasonInput.value = '';  // 清空输入框
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
// 初始加载
fetchNumber();