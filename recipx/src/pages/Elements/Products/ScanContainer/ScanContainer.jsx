import { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import paths from '../../../../paths'

export default function ScanContainer () {
  const [codeBar, setCodeBar] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (codeBar) {
      navigate(paths.scanResult)
    }
  }, [codeBar])

  return (
    <Outlet context={{ codeBar, setCodeBar }}/>
  )
}
