import { useTranslation } from 'react-i18next'

export default function Notice() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="w-full text-left lg:w-1/2 md:w-3/4 xl:w-2/3">
        {t('notice.info')}
      </p>
    </div>
  )
}
