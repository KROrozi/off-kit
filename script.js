{\rtf1\ansi\ansicpg949\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 document.addEventListener('DOMContentLoaded', () => \{\
    const body = document.body;\
\
    // =========================================\
    // 1. \uc0\u45936 \u51060 \u53552  \u44288 \u47532  (\u53685 \u54633  \u51200 \u51109 \u49548 )\
    // =========================================\
    const STORAGE_KEY = 'anxietyInteractionData';\
\
    // \uc0\u50724 \u45720  \u45216 \u51676  \u47928 \u51088 \u50676  \u48152 \u54872  (YYYY-MM-DD)\
    const getTodayDateString = () => new Date().toISOString().split('T')[0];\
\
    // \uc0\u45936 \u51060 \u53552  \u48520 \u47084 \u50724 \u44592  (\u50630 \u44144 \u45208  \u45216 \u51676 \u44032  \u51648 \u45228 \u51004 \u47732  \u52488 \u44592 \u54868 )\
    const loadData = () => \{\
        const today = getTodayDateString();\
        const rawData = localStorage.getItem(STORAGE_KEY);\
        let data = null;\
\
        if (rawData) \{\
            try \{\
                data = JSON.parse(rawData);\
            \} catch (e) \{\
                console.error("\uc0\u45936 \u51060 \u53552  \u54028 \u49905  \u50724 \u47448 ", e);\
            \}\
        \}\
\
        // \uc0\u45936 \u51060 \u53552 \u44032  \u50630 \u44144 \u45208 , \u51200 \u51109 \u46108  \u45216 \u51676 \u44032  \u50724 \u45720 \u44284  \u45796 \u47476 \u47732  \u47532 \u49483  (\u51088 \u51221  \u52488 \u44592 \u54868  \u47196 \u51649 )\
        if (!data || data.date !== today) \{\
            \
            let previousHistory = [];\
            if (data && data.history) \{\
                previousHistory = data.history;\
            \}\
            \
            if (data && data.date && data.date !== today) \{\
                const totalCount = Object.values(data.counts).reduce((a, b) => a + b, 0);\
                if (totalCount > 0) \{\
                    previousHistory.push(\{ date: data.date, count: totalCount \});\
                \}\
            \}\
\
            data = \{\
                date: today,\
                counts: \{\
                    spin: 0,\
                    throw: 0,\
                    press: 0,\
                    touch: 0\
                \},\
                history: previousHistory\
            \};\
            \
            saveData(data);\
        \}\
        \
        if (data.history) \{\
             data.history.sort((a, b) => new Date(b.date) - new Date(a.date));\
             data.history = data.history.slice(0, 4);\
        \}\
\
        return data;\
    \};\
\
    // \uc0\u45936 \u51060 \u53552  \u51200 \u51109 \u54616 \u44592 \
    const saveData = (data) => \{\
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));\
    \};\
\
    // \uc0\u53945 \u51221  \u54876 \u46041  \u52852 \u50868 \u53944  \u51613 \u44032  \u54632 \u49688 \
    const incrementCount = (type) => \{\
        const data = loadData(); \
        \
        if (data.counts[type] !== undefined) \{\
            data.counts[type]++;\
        \} else \{\
            data.counts[type] = 1;\
        \}\
\
        saveData(data);\
        updateAllDisplays(data); \
    \};\
\
    // =========================================\
    // 2. UI \uc0\u50629 \u45936 \u51060 \u53944 \
    // =========================================\
    const counterIds = \{\
        spin: 'counter-spin',\
        throw: 'counter-throw',\
        press: 'counter-press',\
        touch: 'counter-touch'\
    \};\
\
    const dailyCounterContainer = document.getElementById('daily-counter-container');\
\
    const updateAllDisplays = (data) => \{\
        if (!data) data = loadData();\
\
        for (const [type, id] of Object.entries(counterIds)) \{\
            const element = document.getElementById(id);\
            if (element) \{\
                element.textContent = data.counts[type] || 0;\
            \}\
        \}\
\
        if (dailyCounterContainer) \{\
            dailyCounterContainer.innerHTML = '';\
            \
            const todayTotal = Object.values(data.counts).reduce((a, b) => a + b, 0);\
            const todayEl = document.createElement('div');\
            todayEl.className = 'daily-count-item';\
            todayEl.style.fontWeight = 'bold'; \
            todayEl.textContent = `$\{data.date\}: $\{todayTotal\}`;\
            dailyCounterContainer.appendChild(todayEl);\
\
            if (data.history) \{\
                data.history.forEach(item => \{\
                    const el = document.createElement('div');\
                    el.className = 'daily-count-item';\
                    el.style.opacity = '0.7'; \
                    el.textContent = `$\{item.date\}: $\{item.count\}`;\
                    dailyCounterContainer.appendChild(el);\
                \});\
            \}\
        \}\
    \};\
\
    // =========================================\
    // 3. \uc0\u54168 \u51060 \u51648  \u51204 \u54872  \u45348 \u48708 \u44172 \u51060 \u49496 \
    // =========================================\
    document.getElementById('btn-spin-next').addEventListener('click', () => \{ body.className = 'show-throw'; \});\
    document.getElementById('btn-throw-prev').addEventListener('click', () => \{ body.className = 'show-spin'; \});\
    document.getElementById('btn-throw-next').addEventListener('click', () => \{ body.className = 'show-press'; \});\
    document.getElementById('btn-press-prev').addEventListener('click', () => \{ body.className = 'show-throw'; \});\
    document.getElementById('btn-press-next').addEventListener('click', () => \{ body.className = 'show-touch'; \});\
    document.getElementById('btn-touch-prev').addEventListener('click', () => \{ body.className = 'show-press'; \});\
\
    // =========================================\
    // 4. \uc0\u51064 \u53552 \u47001 \u49496  \u47196 \u51649 \
    // =========================================\
\
    // --- SPIN: \uc0\u53364 \u47549  \u54924 \u51204  ---\
    const initRotatableElement = (containerId) => \{\
        const container = document.getElementById(containerId);\
        let isDragging = false, lastAngle = 0, totalRotation = 0, angularVelocity = 0, animationId;\
        let sessionRotationIdx = 0; \
        let center; \
        const getCenter = (element) => \{ const rect = element.getBoundingClientRect(); return \{ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 \}; \};\
        \
        container.addEventListener('mousedown', (e) => \{ \
            e.preventDefault(); isDragging = true; container.style.cursor = 'grabbing'; container.classList.remove('idle-animation'); \
            if (animationId) cancelAnimationFrame(animationId); \
            center = getCenter(container);\
            lastAngle = Math.atan2(e.clientY - center.y, e.clientX - center.x) * (180 / Math.PI); \
        \});\
\
        window.addEventListener('mousemove', (e) => \{ \
            if (!isDragging) return; \
            const currentAngle = Math.atan2(e.clientY - center.y, e.clientX - center.x) * (180 / Math.PI); \
            let deltaAngle = currentAngle - lastAngle; \
            if (deltaAngle > 180) deltaAngle -= 360; \
            else if (deltaAngle < -180) deltaAngle += 360; \
            \
            angularVelocity = deltaAngle; \
            totalRotation += deltaAngle; \
            lastAngle = currentAngle; \
            \
            container.style.transform = `translate(-50%, -50%) rotate($\{totalRotation\}deg)`; \
            checkRotation();\
        \});\
\
        window.addEventListener('mouseup', () => \{ \
            if (!isDragging) return; \
            isDragging = false; container.style.cursor = 'grab'; \
            animateRotation(); \
        \});\
\
        function checkRotation() \{\
            const currentIdx = Math.floor(Math.abs(totalRotation) / 360);\
            if (currentIdx > sessionRotationIdx) \{\
                incrementCount('spin'); \
                sessionRotationIdx = currentIdx;\
            \}\
        \}\
\
        function animateRotation() \{\
            angularVelocity *= 0.98; \
            totalRotation += angularVelocity; \
            container.style.transform = `translate(-50%, -50%) rotate($\{totalRotation\}deg)`; \
            checkRotation();\
            if (Math.abs(angularVelocity) > 0.1) \{ \
                animationId = requestAnimationFrame(animateRotation); \
            \} else \{ \
                container.classList.add('idle-animation'); \
            \}\
        \}\
    \};\
\
    // --- THROW: \uc0\u51088  \u53909 \u44592 \u44592  ---\
    const initThrowableElement = (containerId, areaId) => \{\
        const container = document.getElementById(containerId); \
        const area = document.getElementById(areaId); \
        let isDragging = false, animationId; \
        let pos = \{ x: 0, y: 0 \}, velocity = \{ x: 0, y: 0 \}, rotation = 0, angularVelocity = 0; \
        let lastMouse = \{ x: 0, y: 0 \};\
        \
        container.addEventListener('mousedown', (e) => \{ \
            e.preventDefault(); isDragging = true; container.style.cursor = 'grabbing'; container.classList.remove('idle-animation'); \
            if (animationId) cancelAnimationFrame(animationId); \
            const rect = container.getBoundingClientRect(); \
            const areaRect = area.getBoundingClientRect(); \
            const offsetX = e.clientX - rect.left; \
            const offsetY = e.clientY - rect.top; \
            \
            window.onmousemove = (moveEvent) => \{ \
                if (!isDragging) return; \
                pos.x = moveEvent.clientX - areaRect.left - offsetX; \
                pos.y = moveEvent.clientY - areaRect.top - offsetY; \
                velocity.x = moveEvent.clientX - lastMouse.x; \
                velocity.y = moveEvent.clientY - lastMouse.y; \
                lastMouse = \{ x: moveEvent.clientX, y: moveEvent.clientY \}; \
                \
                const parentCenter = \{ x: area.offsetWidth / 2, y: area.offsetHeight / 2 \}; \
                const elementCenter = \{ x: container.offsetWidth / 2, y: container.offsetHeight / 2\}; \
                container.style.transform = `translate($\{pos.x - parentCenter.x + elementCenter.x\}px, $\{pos.y - parentCenter.y + elementCenter.y\}px) rotate($\{rotation\}deg)`; \
            \}; \
        \});\
        \
        window.addEventListener('mouseup', () => \{ \
            if (!isDragging) return; \
            isDragging = false; container.style.cursor = 'grab'; window.onmousemove = null; \
            angularVelocity = velocity.x * 0.2; \
            animate(); \
        \});\
        \
        function animate() \{\
            velocity.y += 0.5; velocity.x *= 0.995; velocity.y *= 0.995; angularVelocity *= 0.995; \
            pos.x += velocity.x; pos.y += velocity.y; rotation += angularVelocity;\
            \
            const bounce = -0.5;\
            const hitboxPadding = 50; \
            let bounced = false; \
\
            if (pos.x + container.offsetWidth - hitboxPadding > area.offsetWidth) \{ \
                pos.x = area.offsetWidth - (container.offsetWidth - hitboxPadding); \
                velocity.x *= bounce; bounced = true;\
            \} else if (pos.x + hitboxPadding < 0) \{ \
                pos.x = -hitboxPadding; \
                velocity.x *= bounce; bounced = true;\
            \}\
            \
            if (pos.y + container.offsetHeight - hitboxPadding > area.offsetHeight) \{ \
                pos.y = area.offsetHeight - (container.offsetHeight - hitboxPadding); \
                if (Math.abs(velocity.y) < 1.5) velocity.y = 0; \
                else \{ velocity.y *= bounce; bounced = true; \} \
            \} else if (pos.y + hitboxPadding < 0) \{ \
                pos.y = -hitboxPadding; \
                velocity.y *= bounce; bounced = true;\
            \}\
            \
            if (bounced) \{\
                incrementCount('throw'); \
            \}\
\
            const parentCenter = \{ x: area.offsetWidth / 2, y: area.offsetHeight / 2 \}; \
            const elementCenter = \{ x: container.offsetWidth / 2, y: container.offsetHeight / 2\};\
            container.style.transform = `translate($\{pos.x - parentCenter.x + elementCenter.x\}px, $\{pos.y - parentCenter.y + elementCenter.y\}px) rotate($\{rotation\}deg)`;\
            \
            if (Math.abs(velocity.x) < 0.1 && Math.abs(velocity.y) < 1 && Math.abs(angularVelocity) < 0.1 && \
                pos.y + container.offsetHeight - hitboxPadding >= area.offsetHeight - 1) \{ \
                cancelAnimationFrame(animationId);\
                container.style.transition = 'transform 0.5s ease-out'; \
                container.style.transform = `translate(-50%, -50%) rotate($\{rotation\}deg)`;\
                setTimeout(() => \{ container.style.transition = ''; container.classList.add('idle-animation'); \}, 500);\
                return;\
            \}\
            animationId = requestAnimationFrame(animate);\
        \}\
    \};\
\
    // --- PRESS: \uc0\u48380 \u54172  \u45572 \u47476 \u44592  ---\
    const initPressInteraction = (containerId) => \{\
        const container = document.getElementById(containerId);\
        const penSvgUnpressed = document.getElementById('pen-svg-unpressed');\
        const penSvgPressed = document.getElementById('pen-svg-pressed');\
        \
        container.addEventListener('click', () => \{\
            if (penSvgPressed.classList.contains('active')) return;\
            \
            penSvgUnpressed.classList.remove('active');\
            penSvgPressed.classList.add('active');\
            \
            incrementCount('press'); \
\
            setTimeout(() => \{\
                penSvgPressed.classList.remove('active');\
                penSvgUnpressed.classList.add('active');\
            \}, 100); \
        \});\
    \};\
\
    // --- TOUCH: \uc0\u48961 \u48961 \u51060  \u53552 \u53944 \u47532 \u44592  ---\
    const initTouchInteraction = (gridId) => \{\
        const grid = document.getElementById(gridId); \
        const poppedSvg = `<svg viewBox="0 0 117 117" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M74.0303 30.6318L100.559 15.3164L116.392 42.7402L89.8633 58.0557L116.391 73.3711L100.558 100.795L74.0303 85.4785V116.111H42.3633V85.4805L15.8359 100.797L0.00292969 73.3721L26.5303 58.0557L0.00195312 42.7393L15.835 15.3154L42.3633 30.6309V0H74.0303V30.6318Z" fill="white"/></svg>`;\
        \
        const createParticles = (container) => \{ \
            const particleCount = 15; \
            for (let i = 0; i < particleCount; i++) \{ \
                const particle = document.createElement('div'); particle.className = 'particle'; \
                const angle = Math.random() * Math.PI * 2; \
                const force = Math.random() * 60 + 30; \
                const x = Math.cos(angle) * force; const y = Math.sin(angle) * force; \
                particle.style.setProperty('--x', `$\{x\}px`); particle.style.setProperty('--y', `$\{y\}px`); \
                container.appendChild(particle); \
                setTimeout(() => \{ particle.remove(); \}, 500); \
            \} \
        \};\
        \
        const referencePositions = [\{cx: 235, cy: 369\}, \{cx: 329, cy: 527\}, \{cx: 235, cy: 685\}, \{cx: 429, cy: 369\}, \{cx: 523, cy: 527\}, \{cx: 429, cy: 685\}, \{cx: 623, cy: 369\}, \{cx: 717, cy: 527\}, \{cx: 623, cy: 685\}, \{cx: 817, cy: 369\}, \{cx: 911, cy: 527\}, \{cx: 817, cy: 685\}, \{cx: 1011, cy: 369\}, \{cx: 1105, cy: 527\}, \{cx: 1011, cy: 685\}, \{cx: 1205, cy: 369\}, \{cx: 1205, cy: 685\}];\
        const minX = 235, maxX = 1205, minY = 369, maxY = 685; \
        const spanX = maxX - minX, spanY = maxY - minY;\
        const finalPositions = referencePositions.map(p => \{ return [((p.cx - minX) / spanX) * 100, ((p.cy - minY) / spanY) * 100]; \});\
        \
        finalPositions.forEach(pos => \{\
            const point = document.createElement('div'); point.className = 'touch-point'; point.style.left = `$\{pos[0]\}%`; point.style.top = `$\{pos[1]\}%`;\
            point.innerHTML = `<div class="circle"></div><div class="popped-shape">$\{poppedSvg\}</div>`;\
            \
            point.addEventListener('click', () => \{\
                if (!point.classList.contains('popped')) \{\
                    point.classList.add('popped'); \
                    \
                    incrementCount('touch'); \
                    createParticles(point);\
                    \
                    // 8\uc0\u52488  \u54980 \u50640  \u54644 \u45817  \u50896 \u47564  \u47532 \u49483 \
                    setTimeout(() => \{\
                        point.classList.remove('popped');\
                    \}, 8000);\
                \}\
            \});\
            grid.appendChild(point);\
        \});\
    \};\
\
    // =========================================\
    // 5. \uc0\u52488 \u44592  \u49892 \u54665 \
    // =========================================\
    updateAllDisplays();\
\
    initRotatableElement('clip-container');\
    initThrowableElement('ruler-container', 'throw-area');\
    initPressInteraction('pen-container');\
    initTouchInteraction('touch-grid');\
\});}