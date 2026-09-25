let currentMode = 'express';
let currentThemeColor = '#2563eb';
let currentPhotoUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80";

let cvData = {
    experiences: [
        {
            id: 1,
            role: "Développeur Front-End",
            company: "Tech Corp",
            period: "2022 - Présent",
            description: "Développement d'applications web réactives et performantes."
        }
    ],
    education: [
        {
            id: 1,
            degree: "Licence Informatique",
            school: "Université de Paris",
            period: "2019 - 2022"
        }
    ]
};

window.onload = function() {
    switchMode('express');
    renderFormContainers();
    renderCV();
    initMobileView();
};

// Mode Switching Handler
function switchMode(mode) {
    currentMode = mode;

    const btnExpress = document.getElementById('btn-mode-express');
    const btnStandard = document.getElementById('btn-mode-standard');
    const btnBalanced = document.getElementById('btn-mode-balanced');
    const btnFull = document.getElementById('btn-mode-full');

    const badgeLabel = document.getElementById('mode-badge-label');

    // Reset buttons styling
    [btnExpress, btnStandard, btnBalanced, btnFull].forEach(btn => {
        btn.className = "p-2 text-xs font-bold rounded-xl border border-slate-800 bg-slate-900 text-slate-400 hover:text-white transition flex items-center justify-center gap-1.5";
    });

    // Highlight active mode
    if (mode === 'express') {
        btnExpress.className = "p-2 text-xs font-bold rounded-xl border border-amber-500/50 bg-amber-500/10 text-amber-300 transition flex items-center justify-center gap-1.5 shadow-sm";
        badgeLabel.innerText = "Mode Éclair";
        badgeLabel.className = "text-amber-400 font-bold";
    } else if (mode === 'standard') {
        btnStandard.className = "p-2 text-xs font-bold rounded-xl border border-blue-500/50 bg-blue-500/10 text-blue-300 transition flex items-center justify-center gap-1.5 shadow-sm";
        badgeLabel.innerText = "Mode Standard";
        badgeLabel.className = "text-blue-400 font-bold";
    } else if (mode === 'balanced') {
        btnBalanced.className = "p-2 text-xs font-bold rounded-xl border border-emerald-500/50 bg-emerald-500/10 text-emerald-300 transition flex items-center justify-center gap-1.5 shadow-sm";
        badgeLabel.innerText = "Mode Équilibré";
        badgeLabel.className = "text-emerald-400 font-bold";
    } else {
        btnFull.className = "p-2 text-xs font-bold rounded-xl border border-purple-500/50 bg-purple-500/10 text-purple-300 transition flex items-center justify-center gap-1.5 shadow-sm";
        badgeLabel.innerText = "Mode Étendu";
        badgeLabel.className = "text-purple-400 font-bold";
    }

    // Field Section Visibility
    const sectionSummary = document.getElementById('section-summary');
    const sectionEducation = document.getElementById('section-education');
    const sectionExtra = document.getElementById('section-extra');
    const fieldLinkedIn = document.getElementById('field-linkedin-container');

    if (mode === 'express') {
        sectionSummary.classList.add('hidden');
        sectionEducation.classList.add('hidden');
        sectionExtra.classList.add('hidden');
        fieldLinkedIn.classList.add('hidden');
    } else if (mode === 'standard') {
        sectionSummary.classList.add('hidden');
        sectionEducation.classList.remove('hidden');
        sectionExtra.classList.add('hidden');
        fieldLinkedIn.classList.add('hidden');
    } else if (mode === 'balanced') {
        sectionSummary.classList.remove('hidden');
        sectionEducation.classList.remove('hidden');
        sectionExtra.classList.add('hidden');
        fieldLinkedIn.classList.remove('hidden');
    } else {
        sectionSummary.classList.remove('hidden');
        sectionEducation.classList.remove('hidden');
        sectionExtra.classList.remove('hidden');
        fieldLinkedIn.classList.remove('hidden');
    }

    renderCV();
}

// Image Gallery Photo Upload Handler
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            currentPhotoUrl = e.target.result;
            document.getElementById('photo-preview-thumbnail').src = currentPhotoUrl;
            renderCV();
        };
        reader.readAsDataURL(file);
    }
}

function removePhoto() {
    currentPhotoUrl = "";
    document.getElementById('photo-preview-thumbnail').src = "https://placehold.co/100x100/1e293b/64748b?text=Sans+Photo";
    document.getElementById('input-photo-file').value = "";
    renderCV();
}

function setColor(color) {
    currentThemeColor = color;
    document.getElementById('input-custom-color').value = color;
    renderCV();
}

function renderFormContainers() {
    document.getElementById('experiences-container').innerHTML = cvData.experiences.map(item => `
        <div class="bg-slate-900 border border-slate-800 p-3 rounded-xl space-y-2 relative">
            <button onclick="removeExperience(${item.id})" class="absolute top-2 right-2 text-slate-500 hover:text-red-400 text-xs">
                <i class="fa-solid fa-trash"></i>
            </button>
            <input type="text" value="${escapeHtml(item.role)}" oninput="updateExperience(${item.id}, 'role', this.value)" placeholder="Poste" class="w-full text-xs bg-slate-800 border border-slate-700 rounded p-1.5 text-slate-100">
            <div class="grid grid-cols-2 gap-2">
                <input type="text" value="${escapeHtml(item.company)}" oninput="updateExperience(${item.id}, 'company', this.value)" placeholder="Entreprise" class="w-full text-xs bg-slate-800 border border-slate-700 rounded p-1.5 text-slate-100">
                <input type="text" value="${escapeHtml(item.period)}" oninput="updateExperience(${item.id}, 'period', this.value)" placeholder="Période" class="w-full text-xs bg-slate-800 border border-slate-700 rounded p-1.5 text-slate-100">
            </div>
        </div>
    `).join('');

    document.getElementById('education-container').innerHTML = cvData.education.map(item => `
        <div class="bg-slate-900 border border-slate-800 p-3 rounded-xl space-y-2 relative">
            <button onclick="removeEducation(${item.id})" class="absolute top-2 right-2 text-slate-500 hover:text-red-400 text-xs">
                <i class="fa-solid fa-trash"></i>
            </button>
            <input type="text" value="${escapeHtml(item.degree)}" oninput="updateEducation(${item.id}, 'degree', this.value)" placeholder="Diplôme" class="w-full text-xs bg-slate-800 border border-slate-700 rounded p-1.5 text-slate-100">
            <div class="grid grid-cols-2 gap-2">
                <input type="text" value="${escapeHtml(item.school)}" oninput="updateEducation(${item.id}, 'school', this.value)" placeholder="École" class="w-full text-xs bg-slate-800 border border-slate-700 rounded p-1.5 text-slate-100">
                <input type="text" value="${escapeHtml(item.period)}" oninput="updateEducation(${item.id}, 'period', this.value)" placeholder="Période" class="w-full text-xs bg-slate-800 border border-slate-700 rounded p-1.5 text-slate-100">
            </div>
        </div>
    `).join('');
}

function addExperience() {
    cvData.experiences.push({ id: Date.now(), role: "Nouveau poste", company: "Entreprise", period: "2023", description: "" });
    renderFormContainers();
    renderCV();
}
function removeExperience(id) {
    cvData.experiences = cvData.experiences.filter(i => i.id !== id);
    renderFormContainers();
    renderCV();
}
function updateExperience(id, field, val) {
    const item = cvData.experiences.find(i => i.id === id);
    if (item) item[field] = val;
    renderCV();
}

function addEducation() {
    cvData.education.push({ id: Date.now(), degree: "Diplôme", school: "Université", period: "2022" });
    renderFormContainers();
    renderCV();
}
function removeEducation(id) {
    cvData.education = cvData.education.filter(i => i.id !== id);
    renderFormContainers();
    renderCV();
}
function updateEducation(id, field, val) {
    const item = cvData.education.find(i => i.id === id);
    if (item) item[field] = val;
    renderCV();
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, function(m) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
    });
}

function renderCV() {
    const container = document.getElementById('cv-preview-container');
    const template = document.getElementById('select-template').value;
    const fontClass = document.getElementById('select-font').value;

    const firstName = document.getElementById('field-firstname').value || 'Prénom';
    const lastName = document.getElementById('field-lastname').value || 'Nom';
    const title = document.getElementById('field-title').value || 'Titre recherché';
    const email = document.getElementById('field-email').value;
    const phone = document.getElementById('field-phone').value;
    const location = document.getElementById('field-location').value;
    const website = document.getElementById('field-website').value;
    const summary = document.getElementById('field-summary').value;

    const skillsRaw = document.getElementById('field-skills').value || '';
    const skillsList = skillsRaw.split(',').map(s => s.trim()).filter(s => s.length > 0);

    const languages = document.getElementById('field-languages').value;
    const interests = document.getElementById('field-interests').value;

    // Template Layout Renders
    if (template === 'modern') {
        container.className = `cv-page ${fontClass} p-0 flex text-slate-800`;
        container.innerHTML = `
            <!-- Left Sidebar -->
            <div class="w-1/3 p-6 text-white flex flex-col justify-between" style="background-color: ${currentThemeColor}">
                <div>
                    <div class="text-center mb-6">
                        ${currentPhotoUrl ? `<img src="${currentPhotoUrl}" class="w-28 h-28 rounded-2xl object-cover border-4 border-white/30 mx-auto shadow-lg mb-3">` : ''}
                        <h2 class="text-xl font-extrabold tracking-tight">${escapeHtml(firstName)} ${escapeHtml(lastName)}</h2>
                        <p class="text-xs opacity-90 font-medium tracking-wide mt-1 uppercase">${escapeHtml(title)}</p>
                    </div>

                    <div class="space-y-3 text-xs border-t border-white/20 pt-4">
                        <h3 class="font-bold uppercase tracking-wider text-[10px] opacity-80">Contact</h3>
                        ${email ? `<div class="flex items-center space-x-2"><i class="fa-solid fa-envelope text-xs w-4"></i><span class="break-all">${escapeHtml(email)}</span></div>` : ''}
                        ${phone ? `<div class="flex items-center space-x-2"><i class="fa-solid fa-phone text-xs w-4"></i><span>${escapeHtml(phone)}</span></div>` : ''}
                        ${location ? `<div class="flex items-center space-x-2"><i class="fa-solid fa-location-dot text-xs w-4"></i><span>${escapeHtml(location)}</span></div>` : ''}
                        ${(currentMode === 'balanced' || currentMode === 'full') && website ? `<div class="flex items-center space-x-2"><i class="fa-solid fa-globe text-xs w-4"></i><span class="break-all">${escapeHtml(website)}</span></div>` : ''}
                    </div>

                    ${skillsList.length > 0 ? `
                        <div class="mt-6 border-t border-white/20 pt-4">
                            <h3 class="font-bold uppercase tracking-wider text-[10px] opacity-80 mb-2">Compétences</h3>
                            <div class="flex flex-wrap gap-1.5">
                                ${skillsList.map(s => `<span class="px-1 py-0.5 text-[11px] font-medium">${escapeHtml(s)}</span>`).join('')}
                            </div>
                        </div>
                    ` : ''}

                    ${currentMode === 'full' && languages ? `
                        <div class="mt-6 border-t border-white/20 pt-4">
                            <h3 class="font-bold uppercase tracking-wider text-[10px] opacity-80 mb-1">Langues</h3>
                            <p class="text-xs opacity-90">${escapeHtml(languages)}</p>
                        </div>
                    ` : ''}
                </div>
            </div>

            <!-- Right Main Content -->
            <div class="w-2/3 p-8 bg-white flex flex-col justify-between">
                <div class="space-y-6">
                    ${(currentMode === 'balanced' || currentMode === 'full') && summary ? `
                        <div>
                            <h3 class="text-xs font-bold uppercase tracking-wider mb-1.5 pb-1 border-b-2" style="color: ${currentThemeColor}; border-color: ${currentThemeColor}">Profil</h3>
                            <p class="text-xs text-slate-600 leading-relaxed">${escapeHtml(summary)}</p>
                        </div>
                    ` : ''}

                    ${cvData.experiences.length > 0 ? `
                        <div>
                            <h3 class="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b-2" style="color: ${currentThemeColor}; border-color: ${currentThemeColor}">Expériences</h3>
                            <div class="space-y-3">
                                ${cvData.experiences.map(e => `
                                    <div>
                                        <div class="flex justify-between items-baseline text-xs font-bold">
                                            <span>${escapeHtml(e.role)}</span>
                                            <span class="text-slate-400 font-normal">${escapeHtml(e.period)}</span>
                                        </div>
                                        <p class="text-xs font-semibold" style="color:${currentThemeColor}">${escapeHtml(e.company)}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}

                    ${currentMode !== 'express' && cvData.education.length > 0 ? `
                        <div>
                            <h3 class="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b-2" style="color: ${currentThemeColor}; border-color: ${currentThemeColor}">Formations</h3>
                            <div class="space-y-2">
                                ${cvData.education.map(ed => `
                                    <div class="text-xs">
                                        <div class="flex justify-between font-bold">
                                            <span>${escapeHtml(ed.degree)}</span>
                                            <span class="text-slate-400 font-normal">${escapeHtml(ed.period)}</span>
                                        </div>
                                        <p class="text-slate-500">${escapeHtml(ed.school)}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}

                    ${currentMode === 'full' && interests ? `
                        <div>
                            <h3 class="text-xs font-bold uppercase tracking-wider mb-1 pb-1 border-b-2" style="color: ${currentThemeColor}; border-color: ${currentThemeColor}">Centres d'intérêt</h3>
                            <p class="text-xs text-slate-600">${escapeHtml(interests)}</p>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    } else if (template === 'classic') {
        container.className = `cv-page ${fontClass} p-8 text-slate-800 flex flex-col justify-between`;
        container.innerHTML = `
            <div class="space-y-6">
                <div class="flex items-center justify-between border-b-2 pb-6" style="border-color: ${currentThemeColor}">
                    <div>
                        <h1 class="text-3xl font-extrabold uppercase tracking-tight text-slate-900">${escapeHtml(firstName)} ${escapeHtml(lastName)}</h1>
                        <p class="text-base font-semibold tracking-wide mt-1" style="color: ${currentThemeColor}">${escapeHtml(title)}</p>

                        <div class="flex flex-wrap gap-3 text-xs text-slate-600 pt-3">
                            ${email ? `<span><i class="fa-solid fa-envelope mr-1" style="color:${currentThemeColor}"></i>${escapeHtml(email)}</span>` : ''}
                            ${phone ? `<span><i class="fa-solid fa-phone mr-1" style="color:${currentThemeColor}"></i>${escapeHtml(phone)}</span>` : ''}
                            ${location ? `<span><i class="fa-solid fa-location-dot mr-1" style="color:${currentThemeColor}"></i>${escapeHtml(location)}</span>` : ''}
                        </div>
                    </div>

                    ${currentPhotoUrl ? `<img src="${currentPhotoUrl}" class="w-24 h-24 rounded-xl object-cover border-2 shadow-md shrink-0" style="border-color: ${currentThemeColor}">` : ''}
                </div>

                ${(currentMode === 'balanced' || currentMode === 'full') && summary ? `
                    <div>
                        <h2 class="text-xs font-bold uppercase tracking-wider mb-1" style="color:${currentThemeColor}">Profil</h2>
                        <p class="text-xs text-slate-700 leading-relaxed">${escapeHtml(summary)}</p>
                    </div>
                ` : ''}

                ${cvData.experiences.length > 0 ? `
                    <div>
                        <h2 class="text-xs font-bold uppercase tracking-wider border-b pb-1 mb-3" style="color:${currentThemeColor}">Expériences</h2>
                        <div class="space-y-3">
                            ${cvData.experiences.map(e => `
                                <div>
                                    <div class="flex justify-between text-xs font-bold">
                                        <span>${escapeHtml(e.role)}</span>
                                        <span class="text-slate-400 font-normal">${escapeHtml(e.period)}</span>
                                    </div>
                                    <p class="text-xs font-semibold" style="color:${currentThemeColor}">${escapeHtml(e.company)}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                ${currentMode !== 'express' && cvData.education.length > 0 ? `
                    <div>
                        <h2 class="text-xs font-bold uppercase tracking-wider border-b pb-1 mb-3" style="color:${currentThemeColor}">Formations</h2>
                        <div class="space-y-2">
                            ${cvData.education.map(ed => `
                                <div class="text-xs">
                                    <span class="font-bold">${escapeHtml(ed.degree)}</span> - <span class="text-slate-500">${escapeHtml(ed.school)} (${escapeHtml(ed.period)})</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                ${skillsList.length > 0 ? `
                    <div>
                        <h2 class="text-xs font-bold uppercase tracking-wider border-b pb-1 mb-2" style="color:${currentThemeColor}">Compétences</h2>
                        <div class="flex flex-wrap gap-1.5">
                            ${skillsList.map(s => `<span class="px-2.5 py-1 rounded bg-slate-100 text-xs font-semibold text-slate-700">${escapeHtml(s)}</span>`).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    } else {
        // Minimalist Template
        container.className = `cv-page ${fontClass} p-8 text-slate-800 flex flex-col justify-between`;
        container.innerHTML = `
            <div class="space-y-6">
                <div class="flex items-center space-x-6 border-b pb-6">
                    ${currentPhotoUrl ? `<img src="${currentPhotoUrl}" class="w-20 h-20 rounded-full object-cover">` : ''}
                    <div>
                        <h1 class="text-2xl font-extrabold text-slate-900">${escapeHtml(firstName)} ${escapeHtml(lastName)}</h1>
                        <p class="text-xs font-bold uppercase tracking-wider mt-0.5" style="color:${currentThemeColor}">${escapeHtml(title)}</p>
                        <div class="flex flex-wrap gap-2 text-xs text-slate-500 mt-2">
                            ${email ? `<span>${escapeHtml(email)}</span>` : ''}
                            ${phone ? `<span>• ${escapeHtml(phone)}</span>` : ''}
                            ${location ? `<span>• ${escapeHtml(location)}</span>` : ''}
                        </div>
                    </div>
                </div>

                ${(currentMode === 'balanced' || currentMode === 'full') && summary ? `
                    <p class="text-xs text-slate-600 italic border-l-2 pl-3" style="border-color: ${currentThemeColor}">${escapeHtml(summary)}</p>
                ` : ''}

                ${cvData.experiences.length > 0 ? `
                    <div>
                        <h2 class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Expérience</h2>
                        <div class="space-y-3">
                            ${cvData.experiences.map(e => `
                                <div>
                                    <div class="flex justify-between text-xs font-bold">
                                        <span>${escapeHtml(e.role)}</span>
                                        <span class="text-slate-400 font-normal">${escapeHtml(e.period)}</span>
                                    </div>
                                    <p class="text-xs text-slate-600">${escapeHtml(e.company)}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                ${currentMode !== 'express' && cvData.education.length > 0 ? `
                    <div>
                        <h2 class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Formation</h2>
                        <div class="space-y-2">
                            ${cvData.education.map(ed => `
                                <div class="text-xs">
                                    <span class="font-bold">${escapeHtml(ed.degree)}</span> - <span class="text-slate-500">${escapeHtml(ed.school)}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                ${skillsList.length > 0 ? `
                    <div>
                        <h2 class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Compétences</h2>
                        <div class="flex flex-wrap gap-1.5">
                            ${skillsList.map(s => `<span class="px-2 py-0.5 rounded bg-slate-100 text-xs text-slate-700">${escapeHtml(s)}</span>`).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }
}

// =========================================================
// EXPORT HELPERS
// html2canvas renders the element with its REAL layout box and does not
// reliably apply CSS transforms. On mobile the preview carries a
// transform: scale(...) (to fit the small screen); exporting it as-is
// produces a cropped/garbled PDF. So we temporarily strip the transform
// (and force the true A4 size), run the export, then restore everything.
// =========================================================
function withUntransformedCV(callback) {
    const element = document.getElementById('cv-preview-container');

    // Snapshot the inline style + class so we can restore them exactly.
    const prevStyle = element.getAttribute('style') || '';
    const prevClass = element.getAttribute('class') || '';

    // Force a clean, untransformed A4 page. Using !important via cssText
    // guarantees the media-query transform / offset and any leftover
    // scale variable are neutralised during capture.
    element.setAttribute('style', [
        'transform: none !important',
        'position: static !important',
        'left: 0 !important',
        'margin: 0 !important',
        'margin-bottom: 0 !important',
        'width: 210mm !important',
        'min-height: 297mm !important',
        '--cv-scale: 1',
        '--cv-offset: 0px'
    ].join('; '));

    // Let the browser reflow before html2canvas measures the element.
    void element.offsetWidth;

    const restore = () => {
        if (prevStyle) {
            element.setAttribute('style', prevStyle);
        } else {
            element.removeAttribute('style');
        }
        element.setAttribute('class', prevClass);
        // Re-apply the responsive scale for the current viewport.
        if (typeof updateCvScale === 'function') updateCvScale();
    };

    return Promise.resolve()
        .then(callback)
        .finally(restore);
}

function exportAsPDF() {
    const btn = document.getElementById('btn-export-pdf');
    const element = document.getElementById('cv-preview-container');
    const firstName = document.getElementById('field-firstname').value || 'Mon';
    const lastName = document.getElementById('field-lastname').value || 'CV';

    btn.disabled = true;
    btn.innerHTML = `<i class="fa-solid fa-spinner animate-spin"></i> <span>Génération...</span>`;

    withUntransformedCV(() => {
        const opt = {
            margin: 0,
            filename: `CV_${firstName}_${lastName}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
                scrollX: 0,
                scrollY: 0,
                windowWidth: element.scrollWidth,
                windowHeight: element.scrollHeight
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        return html2pdf().set(opt).from(element).save();
    }).then(() => {
        btn.disabled = false;
        btn.innerHTML = `<i class="fa-solid fa-file-pdf"></i> <span class="hidden sm:inline">Télécharger</span> <span>PDF</span>`;
    }).catch(err => {
        console.error('Erreur PDF:', err);
        btn.disabled = false;
        btn.innerHTML = `<i class="fa-solid fa-file-pdf"></i> <span>PDF</span>`;
    });
}

function exportAsImage() {
    const btn = document.getElementById('btn-export-png');
    const element = document.getElementById('cv-preview-container');
    const firstName = document.getElementById('field-firstname').value || 'Mon';
    const lastName = document.getElementById('field-lastname').value || 'CV';

    btn.disabled = true;
    btn.innerHTML = `<i class="fa-solid fa-spinner animate-spin"></i> <span>Conversion...</span>`;

    withUntransformedCV(() => html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        scrollX: 0,
        scrollY: 0,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
    })).then(canvas => {
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = `CV_${firstName}_${lastName}.png`;
        link.click();

        btn.disabled = false;
        btn.innerHTML = `<i class="fa-solid fa-image text-emerald-400"></i> <span class="hidden sm:inline">Télécharger</span> <span>PNG</span>`;
    }).catch(err => {
        console.error('Erreur PNG:', err);
        btn.disabled = false;
        btn.innerHTML = `<i class="fa-solid fa-image text-emerald-400"></i> <span>PNG</span>`;
    });
}

// =========================================================
// MOBILE: toggle between form editor and live preview.
// Only relevant below the lg breakpoint (1023px); on desktop
// both panes are always visible and the floating button hidden.
// =========================================================

function isMobile() {
    return window.matchMedia('(max-width: 1023px)').matches;
}

function showPreviewOnMobile() {
    document.getElementById('form-sidebar').classList.add('hidden');
    document.getElementById('preview-panel').classList.remove('hidden');
    document.getElementById('btn-mobile-preview').classList.add('hidden');
    // The panel was hidden (width 0) — recompute the scale now that it's visible.
    updateCvScale();
}

function showFormOnMobile() {
    document.getElementById('preview-panel').classList.add('hidden');
    document.getElementById('form-sidebar').classList.remove('hidden');
    document.getElementById('btn-mobile-preview').classList.remove('hidden');
}

// On mobile the preview starts hidden so the form is seen first.
function initMobileView() {
    const sidebar = document.getElementById('form-sidebar');
    const preview = document.getElementById('preview-panel');
    const floatBtn = document.getElementById('btn-mobile-preview');

    if (isMobile()) {
        preview.classList.add('hidden');
        if (floatBtn) floatBtn.classList.remove('hidden');
    } else {
        // Desktop: always show both panes, never the floating button.
        preview.classList.remove('hidden');
        sidebar.classList.remove('hidden');
        if (floatBtn) floatBtn.classList.add('hidden');
    }

    updateCvScale();
}

// Scale the A4 page so it fits the screen width on mobile.
// The A4 page is 210mm wide (~794px at 96dpi); compute the ratio
// against the available panel width and clamp it to 1.
function updateCvScale() {
    const container = document.getElementById('cv-preview-container');
    if (!container) return;

    if (isMobile()) {
        const panel = document.getElementById('preview-panel');
        // If the panel is hidden its clientWidth is 0 — don't apply a
        // (negative) scale; it will be recomputed when the panel opens.
        if (!panel || panel.classList.contains('hidden') || panel.clientWidth === 0) {
            container.style.removeProperty('--cv-scale');
            container.style.removeProperty('--cv-offset');
            return;
        }

        const A4_WIDTH_PX = 210 * (96 / 25.4); // 210mm in CSS pixels ~ 793.7

        // Available width = panel inner width (minus horizontal padding).
        const style = getComputedStyle(panel);
        const padLeft = parseFloat(style.paddingLeft) || 0;
        const padRight = parseFloat(style.paddingRight) || 0;
        const available = panel.clientWidth - padLeft - padRight;

        const scale = Math.min(1, available / A4_WIDTH_PX);
        container.style.setProperty('--cv-scale', scale);

        // Centre the scaled page: the scaled width is A4_WIDTH_PX * scale,
        // so the left offset (inside the padded content box) is half the leftover.
        const scaledWidth = A4_WIDTH_PX * scale;
        const offset = Math.max(0, (available - scaledWidth) / 2);
        container.style.setProperty('--cv-offset', offset + 'px');
    } else {
        container.style.removeProperty('--cv-scale');
        container.style.removeProperty('--cv-offset');
    }
}

// Keep the layout correct when the breakpoint is crossed (rotation,
// window resize) so a phone in landscape never gets stuck.
window.addEventListener('resize', function() {
    if (isMobile()) {
        const previewHidden = document.getElementById('preview-panel').classList.contains('hidden');
        const floatBtn = document.getElementById('btn-mobile-preview');
        if (floatBtn) floatBtn.classList.toggle('hidden', !previewHidden);
    } else {
        document.getElementById('form-sidebar').classList.remove('hidden');
        document.getElementById('preview-panel').classList.remove('hidden');
        document.getElementById('btn-mobile-preview').classList.add('hidden');
    }
    updateCvScale();
});
