import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import Breadcumbs from '~/components/Breadcumbs';
import Combobox from '~/components/Combobox';

type dataTypes = {
  districts: {
    name: string;
    id: number;
    regency_id: number;
  }[];
  provinces: {
    name: string;
    id: number;
  }[];
  regencies: {
    name: string;
    id: number;
    province_id: number;
  }[];
};

function FilterPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [datas, setDatas] = useState<dataTypes>();

  useEffect(() => {
    fetch('/data/indonesia_regions.json')
      .then((res) => res.json())
      .then((result) => setDatas(result));
  }, []);

  const handleSearchParamsChange = (key: string, value: string) => {
    const result = datas?.[key as keyof dataTypes].find(
      (data) => data.id === Number(value),
    );
    if (key === 'provinces') {
      searchParams.delete('regencies');
      searchParams.delete('regencies_id');
      searchParams.delete('districts');
      searchParams.delete('districts_id');
    } else if (key === 'regencies') {
      searchParams.delete('districts');
      searchParams.delete('districts_id');
    }
    setSearchParams((prev) => {
      if (result) {
        prev.set(key, result.name);
        prev.set(`${key}_id`, result.id.toString());
      } else {
        prev.delete(key);
        prev.delete(`${key}_id`);
      }
      return prev;
    });
  };

  const provinces = searchParams.get('provinces');
  const regencies = searchParams.get('regencies');
  const districts = searchParams.get('districts');

  const breadcumbsList = [
    provinces || undefined,
    regencies || undefined,
    districts || undefined,
  ].filter(Boolean) as string[];

  const handleReset = () => {
    setSearchParams({});
  };

  return (
    <div className='grid md:grid-cols-4 h-full'>
      <div className=' light:bg-gray-50 border-r-2 border-r-gray-100'>
        <h3 className='font-semibold text-[18px] px-4 py-8'>
          Frontend Assessment
        </h3>
        <h4 className='font-semibold px-4 md:pt-8 md:pb-2 text-[12px] text-gray-400'>
          FILTER WILAYAH
        </h4>
        <div className='flex flex-col gap-4 md:gap-12 p-4 w-full'>
          <Combobox
            key={+searchParams.get('provinces_id')!}
            label='PROVINSI'
            name='province'
            datas={datas?.provinces}
            value={+searchParams.get('provinces_id')!}
            onChange={(val) => handleSearchParamsChange('provinces', val)}
          />
          <Combobox
            label='KOTA/KABUPATEN'
            name='regency'
            datas={datas?.regencies.filter(
              (regency) =>
                regency.province_id === +searchParams.get('provinces_id')!,
            )}
            value={+searchParams.get('regencies_id')!}
            onChange={(val) => handleSearchParamsChange('regencies', val)}
            disabled={!provinces}
          />
          <Combobox
            label='KECAMATAN'
            name='district'
            datas={datas?.districts.filter(
              (district) =>
                district.regency_id === +searchParams.get('regencies_id')!,
            )}
            value={+searchParams.get('districts_id')!}
            onChange={(val) => handleSearchParamsChange('districts', val)}
            disabled={!regencies}
          />
          <button
            onClick={handleReset}
            className='bg-gray-100 hover:bg-blue-100 font-semibold text-[12px] py-2 px-4 rounded-xl border border-blue-200 active:bg-blue-300 dark:text-gray-700'
          >
            Reset
          </button>
        </div>
      </div>
      <div className='md:col-span-3 flex flex-col'>
        <div className='shadow-md w-full px-12 py-8'>
          <Breadcumbs list={breadcumbsList} />
        </div>
        <div className='h-full light:bg-gray-50 justify-start items-center flex flex-col md:py-24 py-12 md:gap-32 gap-24'>
          {provinces && (
            <div className='text-center'>
              <label className='text-[12px] text-blue-500 font-semibold'>
                PROVINSI
              </label>
              <h1 className='text-[48px] font-bold '>{provinces}</h1>
            </div>
          )}
          {regencies && (
            <div className='text-center'>
              <label className='text-[12px] text-blue-500 font-semibold'>
                KOTA / KABUPATEN
              </label>
              <h1 className='text-[40px] font-bold '>{regencies}</h1>
            </div>
          )}
          {districts && (
            <div className='text-center'>
              <label className='text-[12px] text-blue-500 font-semibold'>
                KECAMATAN
              </label>
              <h1 className='text-[32px] font-bold '>{districts}</h1>
            </div>
          )}
          {!provinces && !regencies && !districts && (
            <h1 className='text-[32px] font-bold text-gray-400'>No Data</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default FilterPage;
