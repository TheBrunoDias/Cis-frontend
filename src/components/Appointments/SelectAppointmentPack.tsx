import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAppointment } from '../../hooks/useAppointment';
import { listServicePack } from '../../services/servicePackService';
import { ServicePack } from '../../types/servicePack';

export const SelectAppointmentPack: React.FC = () => {
  const [packList, setPackList] = useState<ServicePack[]>();
  const { handlePrev, result, handleSelectDate, handleSelectPriceAndQuantity } = useAppointment();
  const { register, handleSubmit } = useForm();

  const getPacks = async (specialtyId: string) => {
    const packs = await listServicePack();
    setPackList(packs.filter((pack) => pack.specialty.id === specialtyId));
  };

  const onSubmit = handleSubmit((data) => {
    if (!result) return;
    if (data.service === 'private') {
      handleSelectPriceAndQuantity(result.specialty?.privatePrice ?? 80, 1);
    } else if (data.service === 'healthInsurence') {
      handleSelectPriceAndQuantity(result.specialty?.healthInsurencePrice ?? 80, 1);
    } else {
      const pack = packList?.find((p) => p.id === data.service);
      if (!pack) {
        toast.error('Erro ao selecionar o pacote!');
        return;
      }
      handleSelectPriceAndQuantity(pack.pricePerAppointment, pack.quantity);
    }
  });

  useEffect(() => {
    if (result?.specialty) {
      getPacks(result.specialty.id);
    }
  }, []);

  return (
    <>
      <p className="text-2xl mb-2">Seleção de Plano: </p>
      <p>
        Planos disponiveis para a especialidade <b>{result?.specialty?.name}</b>
      </p>

      <form onSubmit={onSubmit} className="w-full">
        <fieldset className="w-full flex justify-start items-stretch flex-wrap gap-3 mt-3">
          <label className="rounded-md border border-dark-lighter p-2 flex flex-col">
            <div className="flex justify-start items-center gap-2">
              <input type="radio" value={'private'} {...register('service')} />
              <span className="font-semibold uppercase">Consulta Particular</span>
            </div>
            <span>
              Preço:{' '}
              {new Intl.NumberFormat('pt-br', { currency: 'BRL', style: 'currency' }).format(
                result?.specialty?.privatePrice ?? 0
              )}
            </span>
            <span>Quantidade: 1</span>
          </label>
          <label className="rounded-md border border-dark-lighter p-2 flex flex-col">
            <div className="flex justify-start items-center gap-2">
              <input type="radio" value={'healthInsurence'} {...register('service')} />
              <span className="font-semibold uppercase">Consulta Convênio</span>
            </div>
            <span>
              Preço:{' '}
              {new Intl.NumberFormat('pt-br', { currency: 'BRL', style: 'currency' }).format(
                result?.specialty?.healthInsurencePrice ?? 0
              )}
            </span>
            <span>Quantidade: 1</span>
          </label>
        </fieldset>

        <div className="flex justify-end items-center gap-2 my-2">
          <Button onClick={handlePrev} variant="outlined">
            Voltar
          </Button>
          <Button variant="contained" type="submit">
            Proximo
          </Button>
        </div>
      </form>
    </>
  );
};
