import React from 'react'
import { useContext,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useSkillContext from "../context/SkillContext"; 

const SkillsEdit = () => {

    const { formValues, onChangeInputs, errors,setErrors, getSkillUpdateData, updateSkill } = useContext(useSkillContext);
    let { id } = useParams();

    useEffect(() => {
        getSkillUpdateData(id);
        //setErrors({});
      }, []);

  return (
    <div className='mt-12'>
    <form onSubmit={updateSkill} className='max-w-md mx-auto p-4 bg-white shadow-md rounded-sm'>
       <div className='spance-y-6'>
         <div className='mb-4'>
           <label htmlFor="name" className='block mb-2 text-sm font-medium'>Name</label>
           <input type="text" name="name" value={formValues["name"]} onChange={onChangeInputs} className="border border-gray-500 text-gray-900 text-sm rounded-md block w-full p-2" />
           {errors.name && <span className='text-sm text-red-500'>{ errors.name[0] }</span>}
         </div>
         <div className='mb-4'>
           <label htmlFor="slug" className='block mb-2 text-sm font-medium'>Slug</label>
           <input type="text" name="slug" value={formValues["slug"]} onChange={onChangeInputs} className="border border-gray-500 text-gray-900 text-sm rounded-md block w-full p-2" />
            {errors.slug && <span className='text-sm text-red-500'>{ errors.slug[0] }</span>}
         </div>
         <div className='mb-4'>
           <button className='px-6 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md'>
             Update
           </button>
         </div>
       </div>
    </form>
   </div>
  )
}

export default SkillsEdit