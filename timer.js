var $refs = {};
var $time = {};
const timeFormat = 'HH:mm';

const methods = {
    playButton: () => {
        methods.startTimer();
        this.$refs.playButton.removeEventListener('click', methods.playButton)
        this.$refs.playIcon.style.display = 'none'
        this.$refs.playButton.id = 'counter-wrapper'
        this.$refs.playButton.innerHTML = '<div class="timer-counter">00:00:00</div>';
        this.$refs.playButton.innerHTML += '<button id="stop-btn" class="timer-stop">'
        methods.setPlayListener(true)
    },
    stopButton: () => {
        methods.stopTimer();
        this.$refs.playButton.id = 'play-timer'
        methods.render()
        this.$refs.playIcon.style.display = 'block'
        this.$refs.playButton.removeEventListener('click', methods.stopButton)
        methods.setPlayListener()
    },
    setPlayListener: (stop = false) => {
        let action = stop ? methods.stopButton : methods.playButton;
        this.$refs.playButton.addEventListener("click", action, false);
    },
    startTimer: () => {
        this.$time.current = {};
        this.$time.current.start = dayjs().format(timeFormat);
        this.$time.start = dayjs();
        this.$time.observable = setInterval(_ => {
            Object.values(document.getElementsByClassName('timer-counter')).forEach(element => {
                this.$time.current.diffHours = Math.abs(this.$time.start.diff(this.$time.end, "hours"))
                this.$time.current.diffMinutes = Math.abs(this.$time.start.diff(this.$time.end, "minutes"))
                this.$time.current.diffSeconds = Math.abs(this.$time.start.diff(this.$time.end, "seconds"))
                let h = methods.numberFormat(this.$time.current.diffHours,2);
                let m = methods.numberFormat(this.$time.current.diffMinutes,2);
                let s = methods.numberFormat(this.$time.current.diffSeconds,2);
                this.$time.current.diff = `${h}:${m}:${s}`
                element.innerHTML = this.$time.current.diff;
            });
        }, 1000)
    },
    stopTimer: () => {
        clearInterval(this.$time.observable)
        this.$time.current.end = dayjs().format(timeFormat);
        this.$time.end = dayjs();
        this.$refs.table.innerHTML += `<tr>
        <td>${this.$time.current.start}</td>
        <td>${this.$time.current.end}</td>
        <td>${this.$time.current.diff}</td>
        </tr>`;
        this.$time = {}
    },
    render:() => {
        this.$refs.playButton.innerHTML = `<i id="play-icon">
        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 320.001 320.001" style="enable-background:new 0 0 320.001 320.001;" xml:space="preserve">
        <path fill="white" d="M295.84,146.049l-256-144c-4.96-2.784-11.008-2.72-15.904,0.128C19.008,5.057,16,10.305,16,16.001v288
            c0,5.696,3.008,10.944,7.936,13.824c2.496,1.44,5.28,2.176,8.064,2.176c2.688,0,5.408-0.672,7.84-2.048l256-144
            c5.024-2.848,8.16-8.16,8.16-13.952S300.864,148.897,295.84,146.049z"/>
        <g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
        </svg>
        </i>`;
    },
    numberFormat: (number, width) => {
        return new Array(width + 1 - (number + '').length).join('0') + number;
    }
}


window.onload = () => {
    this.$refs.playButton = document.getElementById('play-timer')
    this.$refs.table = document.getElementById('timer-table')
    
    methods.render()
    this.$refs.playIcon = document.getElementById('play-icon')
    methods.setPlayListener()
}