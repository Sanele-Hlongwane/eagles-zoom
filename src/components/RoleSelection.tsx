'use client';
import { useRef } from 'react';
import updateRole from '@/app/actions/updateRole';
import { toast } from 'react-toastify';
import Image from 'next/image';  // Import Image from Next.js

const AddRole = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const clientAction = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const roleName = formData.get('name') as string; // Ensure role name is captured correctly

    if (!roleName || roleName === '') {
      toast.error('Role name is required');
      return;
    }

    const { data, error } = await updateRole({ name: roleName });

    if (error) {
      toast.error(error);
    } else {
      toast.success(`Role ${data?.name} assigned`);
      formRef.current?.reset();
    }
  };

  return (
    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('/EaglesRingLogo.png')`, filter: 'blur(8px)' }}></div>
    <div style={{ marginTop: '50px' }}>
      <h3>Assign Role</h3>
      <form ref={formRef} onSubmit={clientAction}>
        <div className='form-control'>
          <label htmlFor='name'>Role Name</label>
          <select id='name' name='name'>
            <option value=''>Select role</option>
            <option value='entrepreneur'>Entrepreneur</option>
            <option value='investor'>Investor</option>
          </select>
        </div>
        <button type='submit' className='btn'>
          Assign Role
        </button>
      </form>
    </div>
  );
};

export default AddRole;
