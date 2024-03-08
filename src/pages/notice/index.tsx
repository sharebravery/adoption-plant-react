import { useTranslation } from 'react-i18next'

export default function Notice() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="w-700 text-18">
        {
    t('notice.info')
}
      </p>
    </div>
  )
}
