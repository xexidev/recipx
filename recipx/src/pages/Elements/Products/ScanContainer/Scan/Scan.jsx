import { useState, useEffect, useRef, useContext } from 'react'
import { NotificationsContext } from '../../../../../context/NotificationsContext'
import { useOutletContext } from 'react-router-dom'
import { VideoOff } from 'lucide-react'
import ContentNotification from '../../../../../components/templateparts/ContentNotification/ContentNotification'
import Controls from '../../../../../components/common/Controls/Controls'
import Loading from '../../../../../components/helpers/Loading/Loading'
import LinkButton from '../../../../../components/common/LinkButton/LinkButton'
import ContentHeader from '../../../../../components/templateparts/ContentHeader/ContentHeader'
import Quagga from 'quagga'
import paths from '../../../../../paths'
import './Scan.css'

export default function Scan () {
  const [isLoading, setIsLoading] = useState(true)
  const [cameraNotAvailable, setCameraNotAvailable] = useState(false)
  const { setNotification } = useContext(NotificationsContext)
  const [availableCameras, setAvailableCameras] = useState(null)
  const [selectedCamera, setSelectedCamera] = useState(null)
  const { setCodeBar } = useOutletContext()
  const videoRef = useRef(null)

  useEffect(() => {
    const camId = localStorage.getItem('recipxCamId')
    if (camId) {
      setSelectedCamera(camId)
    }
  }, [])

  const saveCamIdOnLocalStorage = (camId) => {
    localStorage.setItem('recipxCamId', camId)
  }

  const stopVideo = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject
      if (stream) {
        const tracks = stream.getTracks()
        tracks.forEach(track => track.stop())
      }
    }
  }

  // Read CodeBar
  const readCodeBar = () => {
    setCodeBar(null)
    if (videoRef.current) {
      Quagga.init({
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: videoRef.current
        },
        decoder: {
          readers: ['ean_reader']
        }
      }, function (error) {
        if (error) {
          console.log(error)
          return
        }
        console.log('Initialization finished. CodeBar Reader Started.')
        Quagga.start()
        Quagga.onDetected(result => {
          stopVideo()
          const code = result.codeResult.code
          setCodeBar(code)
          Quagga.stop()
        })
      })
    }
  }

  // Get camera access
  const getCamera = async () => {
    const constraints = () => {
      if (localStorage.getItem('recipxCamId')) {
        return {
          video: {
            deviceId: selectedCamera
          }
        }
      } else {
        return {
          video: {
            facingMode: { ideal: 'environment' }
          }
        }
      }
    }
    try {
      const response = await navigator.mediaDevices.getUserMedia(constraints())
      if (response) {
        console.log('Access granted, streaming video')
        const mediaDevices = await navigator.mediaDevices.enumerateDevices()
        const cameraDevices = mediaDevices.filter(device => device.kind === 'videoinput')
        setAvailableCameras(cameraDevices)
        videoRef.current.srcObject = response
        if (!localStorage.getItem('recipxCamId')) {
          const track = videoRef.current.srcObject.getVideoTracks()[0]
          const settings = track.getSettings()
          const deviceId = settings.deviceId
          setSelectedCamera(deviceId)
        }
        videoRef.current.play()
        setIsLoading(false)
        readCodeBar()
      }
    } catch (error) {
      console.log(error)
      console.log('Camera access denied')
    }
  }

  useEffect(() => {
    stopVideo()
    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
      // Check for camera
      const getMediaDevices = async () => {
        const mediaDevices = await navigator.mediaDevices.enumerateDevices()
        const cameraIsAvailable = mediaDevices.some(device => device.kind === 'videoinput')
        if (cameraIsAvailable) {
          getCamera()
        } else {
          setNotification({ message: 'No se ha encontrado ninguna cámara disponible.', type: 'error' })
          setCameraNotAvailable(true)
          setIsLoading(false)
        }
      }
      getMediaDevices()
    } else {
      console.log('MediaDevices is not avaiilable')
    }
  }, [selectedCamera])

  const handleChangeCamera = (camId) => {
    saveCamIdOnLocalStorage(camId)
    setSelectedCamera(camId)
  }
  useEffect(() => {
    return () => {
      stopVideo()
    }
  }, [])

  return (
    <section className='scan container'>
      <div className='content'>
        <ContentHeader
          text='Añade un nuevo producto a tu despensa'
          title='Escanea el código'
        />
        <div className='scan-content'>
          <div className='video-container'>
            <video className={cameraNotAvailable ? 'video off' : 'video'} ref={videoRef}></video>
          </div>
          {isLoading
            ? <Loading />
            : cameraNotAvailable
              ? <ContentNotification
                  icon={<VideoOff />}
                  title='Cámara no encontrada'
                  text='No hemos encontrado ninguna cámara disponible en tu equipo o dispositivo. ¡Pero no hay problema! Puedes agregar los productos manualmente a tu despensa.'
                />
              : selectedCamera &&
                <>
                  <div className='scan-content-camera-controls'>
                    <label htmlFor='select-camera'>Seleccionar cámara</label>
                    <select id='select-camera' className='select scan-content-camera-controls-select' onChange={e => handleChangeCamera(e.target.value)} value={selectedCamera}>
                      {
                        availableCameras.map((camera, key) => (
                          <option key={key} value={camera.deviceId}>{camera.label}</option>
                        )
                        )
                      }
                    </select>
                  </div>
                </>
          }
          <Controls className='scan-content-buttons'>
            <LinkButton className='button-orange' to={paths.addManually}>Añadir manualmente</LinkButton>
          </Controls>
        </div>
      </div>
    </section>
  )
}
