export default function Breadcumbs({ list }: { list?: string[] }) {
  return (
    <nav className='flex' aria-label='Breadcrumb'>
      <ol className='inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse'>
        <li className='inline-flex items-center'>
          <a className='inline-flex items-center text-sm font-medium text-body hover:text-fg-brand'>
            Indonesia
          </a>
        </li>
        {list?.map((item, index) => (
          <li key={index}>
            <div className='flex items-center'>
              <svg
                className='w-3.5 h-3.5 rtl:rotate-180 text-body'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                fill='none'
                viewBox='0 0 24 24'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='m9 5 7 7-7 7'
                />
              </svg>
              <a
                className={`inline-flex items-center text-sm font-medium text-body hover:text-fg-brand ml-1 ${index === list.length - 1 ? 'text-blue-600' : ''}`}
              >
                {item}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
