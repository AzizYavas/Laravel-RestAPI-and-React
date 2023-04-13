import { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthContext from "../context/AuthContext";
import useSkillContext from "../context/SkillContext"; 

const Home = () => {

  const { user } = useAuthContext();

  const { skills, getSkills, deleteSkills } = useContext(useSkillContext);

  useEffect(() => {
    getSkills();
  }, []);

  return <div className="bg-green-300 max-w-7xl min-h-screen mx-auto mt-12" >
   <div className="mx-auto">Kullanıcı Adı : {user?.name} // Kullanıcı Id: {user?.id}</div>
   
   <div className='mt-12'>
      <div className='flex justify-end m-2 p-2'>
      </div>
      <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
            <th scope="col" className="py-3 px-6">
                User Id
              </th>
              <th scope="col" className="py-3 px-6">
                Name
              </th>
              <th scope="col" className="py-3 px-6">
                Slug
              </th>
              <th scope="col" className="py-3 px-6">
                Image
              </th>
              <th scope="col" className="py-3 px-6">
                Setting
              </th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill) => {
              return (
                <tr key={skill.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="py-4 px-6">{skill.user_id}</td>
                  <td className="py-4 px-6">{skill.skillName}</td>
                  <td className="py-4 px-6">{skill.url}</td>
                  <td>
                    {skill.image_path == null ? "Resim Yok" : 
                    <div>
                      <img src={skill.image_path}  width="50" height="50" />
                    </div>
                    }
                  </td>
                  <td className="py-4 px-6 space-x-8">
                    <Link to={`/skills/${skill.id}/edit`} className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded-md" >Edit</Link>
                    <button onClick={() => deleteSkills(skill.id)} className='px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded-md'>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
    </div>;
  
};

export default Home;