const openContactBtn = document.getElementById('openContact');
const closeBtn = document.getElementById('closeContact');
const contactModal = document.getElementById('contactModal');

openContactBtn.addEventListener('click', () => {
  contactModal.classList.remove('hidden');
});

closeBtn.addEventListener('click', () => {
  contactModal.classList.add('hidden');
});

// 바깥 영역 클릭 시 닫기
contactModal.addEventListener('click', (e) => {
  if (e.target === contactModal) {
    contactModal.classList.add('hidden');
  }
});

function updateDDay() {
  // 2026년 6월 13일 14:00
  const weddingDateTime = new Date('2026-06-13T14:00:00');
  const now = new Date();

  const dDayEl = document.getElementById('dDay');
  const dDayE2 = document.getElementById('dDayNote');

  // 이미 예식 시간이 지난 경우
  if (now >= weddingDateTime) {
    dDayE2.textContent = '';
    dDayEl.textContent = 'THANK YOU';
    return;
  }

  // 날짜 기준 D-Day 계산
  const weddingDate = new Date(weddingDateTime);
  const today = new Date(now);

  weddingDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffTime = weddingDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 0) {
    dDayEl.textContent = `D-${diffDays}`;
  } else {
    // 날짜는 당일이지만 아직 14:00 전
    dDayEl.textContent = 'D-DAY';
  }
}

updateDDay();


const openAccountBtn = document.getElementById('openAccount');
const closeAccountBtn = document.getElementById('closeAccount');
const accountModal = document.getElementById('accountModal');

openAccountBtn.addEventListener('click', () => {
  resetAccountModal();
  accountModal.classList.remove('hidden');
});
closeAccountBtn.addEventListener('click', () =>{
  accountModal.classList.add('hidden');
  resetAccountModal();
});
// 바깥 영역 클릭 시 닫기
accountModal.addEventListener('click', (e) => {
  if (e.target === accountModal) {
    accountModal.classList.add('hidden');
  resetAccountModal();
  }
});


const steps = document.querySelectorAll('.account-step');
const selectBtns = document.querySelectorAll('.select-btn');

function showStep(id) {
  steps.forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

selectBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    showStep(btn.dataset.target);
  });
});

function resetAccountModal() {
  showStep('accountSelect'); // 항상 선택 화면
}




const copySiteBtn = document.getElementById('copySiteUrl');

copySiteBtn.addEventListener('click', () => {
  const url = window.location.href;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => {
      alert('청첩장 주소가 복사되었습니다.');
    });
  } else {
    // 구형 브라우저 fallback
    const tempInput = document.createElement('input');
    tempInput.value = url;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    alert('청첩장 주소가 복사되었습니다.');
  }
});



const photos = document.querySelectorAll('.photo');
const galleryModal = document.getElementById('galleryModal');
const modalImage = document.getElementById('modalImage');
const galleryCloseBtn = document.getElementById('closeGallery');

let currentIndex = 0;

// 열기
photos.forEach((photo, index) => {
  photo.addEventListener('click', () => {
    currentIndex = index;
    modalImage.src = photo.src;
    galleryModal.classList.remove('hidden');
  });
});

// 닫기
galleryCloseBtn.addEventListener('click', () => {
  galleryModal.classList.add('hidden');
});



let startX = 0;

modalImage.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

modalImage.addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      // 다음
      currentIndex = (currentIndex + 1) % photos.length;
    } else {
      // 이전
      currentIndex =
        (currentIndex - 1 + photos.length) % photos.length;
    }
    modalImage.src = photos[currentIndex].src;
  }
});



// hero v hidden
const scrollIndicator = document.querySelector('.scroll-indicator');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    scrollIndicator.classList.add('hidden');
  } else {
    scrollIndicator.classList.remove('hidden');
  }
});


const bgm = document.getElementById('bgm');

function playBgmOnce() {
  bgm.play().catch(() => {});
  bgm.volume=0.4;
  document.removeEventListener('click', playBgmOnce);
  document.removeEventListener('touchstart', playBgmOnce);
}

document.addEventListener('click', playBgmOnce);
document.addEventListener('touchstart', playBgmOnce);