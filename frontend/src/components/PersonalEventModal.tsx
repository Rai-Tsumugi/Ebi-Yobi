import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const PersonalEventModal = ({ isOpen, onClose, event, dateRange, onSuccess }) => {
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm();

  const isEditMode = !!event;

  useEffect(() => {
    if (isOpen) {
      const defaultValues = {
        title: isEditMode ? event.title : '',
        description: isEditMode ? event.extendedProps.description : '',
        startTime: isEditMode ? new Date(event.start) : (dateRange ? new Date(dateRange.start) : new Date()),
        endTime: isEditMode ? new Date(event.end) : (dateRange ? new Date(dateRange.end) : new Date()),
      };
      reset(defaultValues);
    }
  }, [isOpen, isEditMode, event, dateRange, reset]);

  const handleFormSubmit = async (data) => {
    const payload = {
      ...data,
      startTime: data.startTime.toISOString(),
      endTime: data.endTime.toISOString(),
    };

    const url = isEditMode ? `${API_BASE_URL}/api/personal-events/${event.id.replace('per-', '')}` : `${API_BASE_URL}/api/personal-events`;
    const method = isEditMode ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to save event');
      console.log('PersonalEventModal: onSuccess callback is about to be called after save.');
      onSuccess(); // 親コンポーネントに成功を通知
    } catch (error) {
      console.error(error);
      alert('予定の保存に失敗しました。');
    }
  };

  const handleDelete = async () => {
    if (!isEditMode) return;
    if (!confirm('この予定を本当に削除しますか？')) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/personal-events/${event.id.replace('per-', '')}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete event');
      console.log('PersonalEventModal: onSuccess callback is about to be called after delete.');
      onSuccess();
    } catch (error) {
      console.error(error);
      alert('予定の削除に失敗しました。');
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        {/* ... (Transition.Child for overlay) ... */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  {isEditMode ? '予定の編集' : '新しい予定の作成'}
                </Dialog.Title>
                <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-4 space-y-4">
                  <div>
                    <label>タイトル</label>
                    <input {...register('title', { required: 'タイトルは必須です' })} className="w-full border-gray-300 rounded-md shadow-sm" />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                  </div>
                  <div>
                    <label>開始日時</label>
                    <Controller
                      control={control}
                      name="startTime"
                      render={({ field }) => <DatePicker selected={field.value} onChange={field.onChange} showTimeSelect dateFormat="yyyy/MM/dd HH:mm" className="w-full border-gray-300 rounded-md shadow-sm" />}
                    />
                  </div>
                  <div>
                    <label>終了日時</label>
                    <Controller
                      control={control}
                      name="endTime"
                      render={({ field }) => <DatePicker selected={field.value} onChange={field.onChange} showTimeSelect dateFormat="yyyy/MM/dd HH:mm" className="w-full border-gray-300 rounded-md shadow-sm" />}
                    />
                  </div>
                  <div>
                    <label>詳細 (任意)</label>
                    <textarea {...register('description')} className="w-full border-gray-300 rounded-md shadow-sm" />
                  </div>
                  <div className="flex justify-between mt-6">
                    <div>
                      <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200">保存</button>
                      <button type="button" onClick={onClose} className="ml-2 inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium">キャンセル</button>
                    </div>
                    {isEditMode && (
                      <button type="button" onClick={handleDelete} className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200">削除</button>
                    )}
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
