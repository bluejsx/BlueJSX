import { ElemType, getRefs } from 'bluejsx'

export default () => {

  const refs = getRefs()
  const self = (
    {/* <svg viewBox="0 0 256 256" width="80%" height="80%">
      <g>
        <linearGradient id="_lgradient_2" x1="0.5" y1="0" x2="0.5" y2="1" gradientTransform="matrix(256,0,0,256,0,0)" gradientUnits="userSpaceOnUse">
          <stop offset="1.6666666666666667%" stop-opacity="1" stop-color="black" />
          <stop ref={[refs, 'stopColor']} offset="100%" stop-opacity="1" stop-color="#0000f5" />
        </linearGradient>
        <circle vector-effect="non-scaling-stroke" cx="128" cy="128" r="128" fill="url(#_lgradient_2)" />
        <line ref={[refs, 'line1']} x1='128' y1='223' x2='25' y2='71' stroke="black" stroke-linecap="round" stroke-width='8' stroke-dasharray='1 1' pathLength='1' />
        <line ref={[refs, 'line2']} x1='128' y1='223' x2='231' y2='71' stroke="white" stroke-linecap="round" stroke-width='8' stroke-dasharray='1 1' pathLength='1' />
        <line ref={[refs, 'line3']} x1='192' y1='222' x2='64' y2='33' stroke="white" stroke-linecap="round" stroke-width='8' stroke-dasharray='1 1' pathLength='1' />
        <line ref={[refs, 'line4']} x1='64' y1='222' x2='192' y2='33' stroke="white" stroke-linecap="round" stroke-width='8' stroke-dasharray='1 1' pathLength='1' />
      </g>
    </svg> */}
  )
  const { stopColor, line1, line2, line3, line4 } = refs
  const duration = 1600
  const vLineAnimSetting = [
    {
      strokeDashoffset: [2, 1, 0, 0],
      offset: [0, 0.1, 0.4, 1]
    },
    {
      duration,
      easing: 'ease-in-out'
    }
  ]
  const xLineAnimSetting = [
    {
      strokeDashoffset: [2, 1, 1, 1, 0],
      offset: [0, 0.1, 0.2, 0.4, 0.7],
      easing: ['linear', 'step-end', 'ease-in-out']
    },
    {
      duration,
      easing: 'ease-in-out'
    }
  ]
  const animations = [
    line1.animate(...vLineAnimSetting),
    line2.animate(...vLineAnimSetting),
    line3.animate(...xLineAnimSetting),
    line4.animate(...xLineAnimSetting),
    stopColor.animate([
      {
        stopColor: '#0000f5',
      },
      {
        stopColor: '#000000',
        offset: 0.2
      },
      {
        stopColor: '#0000f5',
        offset: 1
      },
    ], {
      duration,
      easing: 'ease-in-out',
    })
  ]
  Object.defineProperties(self, {
    play: {
      value: () => {
        for (let i = animations.length; i--;) animations[i].play()
      },
    },
    pause: {
      value: () => {
        for (let i = animations.length; i--;) animations[i].pause()
      },
    }
  })
  self.pause()
  self.onmouseenter = () => self.play()
  self.onclick = () => self.play()
  return self
}