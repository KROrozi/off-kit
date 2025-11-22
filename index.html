document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

    // =========================================
    // 1. 데이터 관리 (통합 저장소)
    // =========================================
    const STORAGE_KEY = 'anxietyInteractionData';

    // 오늘 날짜 문자열 반환 (YYYY-MM-DD)
    const getTodayDateString = () => new Date().toISOString().split('T')[0];

    // 데이터 불러오기 (없거나 날짜가 지났으면 초기화)
    const loadData = () => {
        const today = getTodayDateString();
        const rawData = localStorage.getItem(STORAGE_KEY);
        let data = null;

        if (rawData) {
            try {
                data = JSON.parse(rawData);
            } catch (e) {
                console.error("데이터 파싱 오류", e);
            }
        }

        // 데이터가 없거나, 저장된 날짜가 오늘과 다르면 리셋 (자정 초기화 로직)
        if (!data || data.date !== today) {
            
            let previousHistory = [];
            if (data && data.history) {
                previousHistory = data.history;
            }
            
            if (data && data.date && data.date !== today) {
                const totalCount = Object.values(data.counts).reduce((a, b) => a + b, 0);
                if (totalCount > 0) {
                    previousHistory.push({ date: data.date, count: totalCount });
                }
            }

            data = {
                date: today,
                counts: {
                    spin: 0,
                    throw: 0,
                    press: 0,
                    touch: 0
                },
                history: previousHistory
            };
            
            saveData(data);
        }
        
        if (data.history) {
             data.history.sort((a, b) => new Date(b.date) - new Date(a.date));
             data.history = data.history.slice(0, 4);
        }

        return data;
    };

    // 데이터 저장하기
    const saveData = (data) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    };

    // 특정 활동 카운트 증가 함수
    const incrementCount = (type) => {
        const data = loadData(); 
        
        if (data.counts[type] !== undefined) {
            data.counts[type]++;
        } else {
            data.counts[type] = 1;
        }

        saveData(data);
        updateAllDisplays(data); 
    };

    // =========================================
    // 2. UI 업데이트
    // =========================================
    const counterIds = {
        spin: 'counter-spin',
        throw: 'counter-throw',
        press: 'counter-press',
        touch: 'counter-touch'
    };

    const dailyCounterContainer = document.getElementById('daily-counter-container');

    const updateAllDisplays = (data) => {
        if (!data) data = loadData();

        for (const [type, id] of Object.entries(counterIds)) {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = data.counts[type] || 0;
            }
        }

        if (dailyCounterContainer) {
            dailyCounterContainer.innerHTML = '';
            
            const todayTotal = Object.values(data.counts).reduce((a, b) => a + b, 0);
            const todayEl = document.createElement('div');
            todayEl.className = 'daily-count-item';
            todayEl.style.fontWeight = 'bold'; 
            todayEl.textContent = `${data.date}: ${todayTotal}`;
            dailyCounterContainer.appendChild(todayEl);

            if (data.history) {
                data.history.forEach(item => {
                    const el = document.createElement('div');
                    el.className = 'daily-count-item';
                    el.style.opacity = '0.7'; 
                    el.textContent = `${item.date}: ${item.count}`;
                    dailyCounterContainer.appendChild(el);
                });
            }
        }
    };

    // =========================================
    // 3. 페이지 전환 네비게이션
    // =========================================
    document.getElementById('btn-spin-next').addEventListener('click', () => { body.className = 'show-throw'; });
    document.getElementById('btn-throw-prev').addEventListener('click', () => { body.className = 'show-spin'; });
    document.getElementById('btn-throw-next').addEventListener('click', () => { body.className = 'show-press'; });
    document.getElementById('btn-press-prev').addEventListener('click', () => { body.className = 'show-throw'; });
    document.getElementById('btn-press-next').addEventListener('click', () => { body.className = 'show-touch'; });
    document.getElementById('btn-touch-prev').addEventListener('click', () => { body.className = 'show-press'; });

    // =========================================
    // 4. 인터랙션 로직
    // =========================================

    // --- SPIN: 클립 회전 ---
    const initRotatableElement = (containerId) => {
        const container = document.getElementById(containerId);
        let isDragging = false, lastAngle = 0, totalRotation = 0, angularVelocity = 0, animationId;
        let sessionRotationIdx = 0; 
        let center; 
        const getCenter = (element) => { const rect = element.getBoundingClientRect(); return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }; };
        
        container.addEventListener('mousedown', (e) => { 
            e.preventDefault(); isDragging = true; container.style.cursor = 'grabbing'; container.classList.remove('idle-animation'); 
            if (animationId) cancelAnimationFrame(animationId); 
            center = getCenter(container);
            lastAngle = Math.atan2(e.clientY - center.y, e.clientX - center.x) * (180 / Math.PI); 
        });

        window.addEventListener('mousemove', (e) => { 
            if (!isDragging) return; 
            const currentAngle = Math.atan2(e.clientY - center.y, e.clientX - center.x) * (180 / Math.PI); 
            let deltaAngle = currentAngle - lastAngle; 
            if (deltaAngle > 180) deltaAngle -= 360; 
            else if (deltaAngle < -180) deltaAngle += 360; 
            
            angularVelocity = deltaAngle; 
            totalRotation += deltaAngle; 
            lastAngle = currentAngle; 
            
            container.style.transform = `translate(-50%, -50%) rotate(${totalRotation}deg)`; 
            checkRotation();
        });

        window.addEventListener('mouseup', () => { 
            if (!isDragging) return; 
            isDragging = false; container.style.cursor = 'grab'; 
            animateRotation(); 
        });

        function checkRotation() {
            const currentIdx = Math.floor(Math.abs(totalRotation) / 360);
            if (currentIdx > sessionRotationIdx) {
                incrementCount('spin'); 
                sessionRotationIdx = currentIdx;
            }
        }

        function animateRotation() {
            angularVelocity *= 0.98; 
            totalRotation += angularVelocity; 
            container.style.transform = `translate(-50%, -50%) rotate(${totalRotation}deg)`; 
            checkRotation();
            if (Math.abs(angularVelocity) > 0.1) { 
                animationId = requestAnimationFrame(animateRotation); 
            } else { 
                container.classList.add('idle-animation'); 
            }
        }
    };

    // --- THROW: 자 튕기기 ---
    const initThrowableElement = (containerId, areaId) => {
        const container = document.getElementById(containerId); 
        const area = document.getElementById(areaId); 
        let isDragging = false, animationId; 
        let pos = { x: 0, y: 0 }, velocity = { x: 0, y: 0 }, rotation = 0, angularVelocity = 0; 
        let lastMouse = { x: 0, y: 0 };
        
        container.addEventListener('mousedown', (e) => { 
            e.preventDefault(); isDragging = true; container.style.cursor = 'grabbing'; container.classList.remove('idle-animation'); 
            if (animationId) cancelAnimationFrame(animationId); 
            const rect = container.getBoundingClientRect(); 
            const areaRect = area.getBoundingClientRect(); 
            const offsetX = e.clientX - rect.left; 
            const offsetY = e.clientY - rect.top; 
            
            window.onmousemove = (moveEvent) => { 
                if (!isDragging) return; 
                pos.x = moveEvent.clientX - areaRect.left - offsetX; 
                pos.y = moveEvent.clientY - areaRect.top - offsetY; 
                velocity.x = moveEvent.clientX - lastMouse.x; 
                velocity.y = moveEvent.clientY - lastMouse.y; 
                lastMouse = { x: moveEvent.clientX, y: moveEvent.clientY }; 
                
                const parentCenter = { x: area.offsetWidth / 2, y: area.offsetHeight / 2 }; 
                const elementCenter = { x: container.offsetWidth / 2, y: container.offsetHeight / 2}; 
                container.style.transform = `translate(${pos.x - parentCenter.x + elementCenter.x}px, ${pos.y - parentCenter.y + elementCenter.y}px) rotate(${rotation}deg)`; 
            }; 
        });
        
        window.addEventListener('mouseup', () => { 
            if (!isDragging) return; 
            isDragging = false; container.style.cursor = 'grab'; window.onmousemove = null; 
            angularVelocity = velocity.x * 0.2; 
            animate(); 
        });
        
        function animate() {
            velocity.y += 0.5; velocity.x *= 0.995; velocity.y *= 0.995; angularVelocity *= 0.995; 
            pos.x += velocity.x; pos.y += velocity.y; rotation += angularVelocity;
            
            const bounce = -0.5;
            const hitboxPadding = 50; 
            let bounced = false; 

            if (pos.x + container.offsetWidth - hitboxPadding > area.offsetWidth) { 
                pos.x = area.offsetWidth - (container.offsetWidth - hitboxPadding); 
                velocity.x *= bounce; bounced = true;
            } else if (pos.x + hitboxPadding < 0) { 
                pos.x = -hitboxPadding; 
                velocity.x *= bounce; bounced = true;
            }
            
            if (pos.y + container.offsetHeight - hitboxPadding > area.offsetHeight) { 
                pos.y = area.offsetHeight - (container.offsetHeight - hitboxPadding); 
                if (Math.abs(velocity.y) < 1.5) velocity.y = 0; 
                else { velocity.y *= bounce; bounced = true; } 
            } else if (pos.y + hitboxPadding < 0) { 
                pos.y = -hitboxPadding; 
                velocity.y *= bounce; bounced = true;
            }
            
            if (bounced) {
                incrementCount('throw'); 
            }

            const parentCenter = { x: area.offsetWidth / 2, y: area.offsetHeight / 2 }; 
            const elementCenter = { x: container.offsetWidth / 2, y: container.offsetHeight / 2};
            container.style.transform = `translate(${pos.x - parentCenter.x + elementCenter.x}px, ${pos.y - parentCenter.y + elementCenter.y}px) rotate(${rotation}deg)`;
            
            if (Math.abs(velocity.x) < 0.1 && Math.abs(velocity.y) < 1 && Math.abs(angularVelocity) < 0.1 && 
                pos.y + container.offsetHeight - hitboxPadding >= area.offsetHeight - 1) { 
                cancelAnimationFrame(animationId);
                container.style.transition = 'transform 0.5s ease-out'; 
                container.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
                setTimeout(() => { container.style.transition = ''; container.classList.add('idle-animation'); }, 500);
                return;
            }
            animationId = requestAnimationFrame(animate);
        }
    };

    // --- PRESS: 볼펜 누르기 ---
    const initPressInteraction = (containerId) => {
        const container = document.getElementById(containerId);
        const penSvgUnpressed = document.getElementById('pen-svg-unpressed');
        const penSvgPressed = document.getElementById('pen-svg-pressed');
        
        container.addEventListener('click', () => {
            if (penSvgPressed.classList.contains('active')) return;
            
            penSvgUnpressed.classList.remove('active');
            penSvgPressed.classList.add('active');
            
            incrementCount('press'); 

            setTimeout(() => {
                penSvgPressed.classList.remove('active');
                penSvgUnpressed.classList.add('active');
            }, 100); 
        });
    };

    // --- TOUCH: 뽁뽁이 터트리기 ---
    const initTouchInteraction = (gridId) => {
        const grid = document.getElementById(gridId); 
        const poppedSvg = `<svg viewBox="0 0 117 117" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M74.0303 30.6318L100.559 15.3164L116.392 42.7402L89.8633 58.0557L116.391 73.3711L100.558 100.795L74.0303 85.4785V116.111H42.3633V85.4805L15.8359 100.797L0.00292969 73.3721L26.5303 58.0557L0.00195312 42.7393L15.835 15.3154L42.3633 30.6309V0H74.0303V30.6318Z" fill="white"/></svg>`;
        
        const createParticles = (container) => { 
            const particleCount = 15; 
            for (let i = 0; i < particleCount; i++) { 
                const particle = document.createElement('div'); particle.className = 'particle'; 
                const angle = Math.random() * Math.PI * 2; 
                const force = Math.random() * 60 + 30; 
                const x = Math.cos(angle) * force; const y = Math.sin(angle) * force; 
                particle.style.setProperty('--x', `${x}px`); particle.style.setProperty('--y', `${y}px`); 
                container.appendChild(particle); 
                setTimeout(() => { particle.remove(); }, 500); 
            } 
        };
        
        const referencePositions = [{cx: 235, cy: 369}, {cx: 329, cy: 527}, {cx: 235, cy: 685}, {cx: 429, cy: 369}, {cx: 523, cy: 527}, {cx: 429, cy: 685}, {cx: 623, cy: 369}, {cx: 717, cy: 527}, {cx: 623, cy: 685}, {cx: 817, cy: 369}, {cx: 911, cy: 527}, {cx: 817, cy: 685}, {cx: 1011, cy: 369}, {cx: 1105, cy: 527}, {cx: 1011, cy: 685}, {cx: 1205, cy: 369}, {cx: 1205, cy: 685}];
        const minX = 235, maxX = 1205, minY = 369, maxY = 685; 
        const spanX = maxX - minX, spanY = maxY - minY;
        const finalPositions = referencePositions.map(p => { return [((p.cx - minX) / spanX) * 100, ((p.cy - minY) / spanY) * 100]; });
        
        finalPositions.forEach(pos => {
            const point = document.createElement('div'); point.className = 'touch-point'; point.style.left = `${pos[0]}%`; point.style.top = `${pos[1]}%`;
            point.innerHTML = `<div class="circle"></div><div class="popped-shape">${poppedSvg}</div>`;
            
            point.addEventListener('click', () => {
                if (!point.classList.contains('popped')) {
                    point.classList.add('popped'); 
                    
                    incrementCount('touch'); 
                    createParticles(point);
                    
                    // 8초 후에 해당 원만 리셋
                    setTimeout(() => {
                        point.classList.remove('popped');
                    }, 8000);
                }
            });
            grid.appendChild(point);
        });
    };

    // =========================================
    // 5. 초기 실행
    // =========================================
    updateAllDisplays();

    initRotatableElement('clip-container');
    initThrowableElement('ruler-container', 'throw-area');
    initPressInteraction('pen-container');
    initTouchInteraction('touch-grid');
});
