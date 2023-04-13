import { createContext, useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../context/AuthContext";


const SkillContext = createContext({});

export const SkillProvider = ({ children }) => {

    const navigate = useNavigate();

    const [skills, setSkills] = useState([]);

    const getSkills = async () => {
        const apiSkills = await axios.get('/api/skills');
        setSkills(apiSkills.data.data);
    }

    // YETENEK KAYDETME İÇİN GEREKEN KODLAR
  

    //FORM İŞLEMLERİ İLE ALAKALI KISIM
        const initialForm = {
            name: "",
            slug: "",
            image : [],
        };

        
        const onChangeImage = (e) => {
            const image = []
            for (let i = 0; i < e.target.files.length; i++) {
                console.log(e.target.files[i].name)
                image.push({idImage: i, nameImage: e.target.files[i].name});
                setFormValues({ ...formValues, image});   
            }

        }

        const onChangeInputs = (e) => {
            const { name, value } = e.target;
            setFormValues({ ...formValues, [name]: value });   
        };

        const [formValues, setFormValues] = useState(initialForm);
        const [errors, setErrors] = useState({});
    //FORM İŞLEMLERİ İLE ALAKALI KISIM

        const storeSkill = async (e) => {
            e.preventDefault();
            try{
                await axios.post('/api/skills', formValues);
                setFormValues(initialForm);
                navigate("/");
            }catch (e) {
                if (e.response.status == 422) {
                    setErrors(e.response.data.errors);
                }
            }
        }

    // YETENEK KAYDETME İÇİN GEREKEN KODLAR

    //YETENEK GÜNCELLEMEK İÇİN KULLANILAN KODLAR

    const [ getUpdateSkill, setUpdateSkill ] = useState([]);

    const getSkillUpdateData = async (id) => {
        const response = await axios.get("/api/skills/" + id);
        const apiSkill = response.data.data;
        setUpdateSkill(apiSkill);
        setFormValues({
            name: apiSkill.skillName,
            slug: apiSkill.url
        })
    }

    const updateSkill = async (e) => {
        e.preventDefault();
        try {
            await axios.put("/api/skills/" + getUpdateSkill.id, formValues);
            setFormValues(initialForm);
            navigate("/");
        } catch (e) {
            if (e.response.status == 422) {
                setErrors(e.response.data.errors);
            }
        }

    }

    //YETENEK GÜNCELLEMEK İÇİN KULLANILAN KODLAR

    //YETENEK SİLME İŞLEMİ
    const deleteSkills = async (id) => {
        if(!window.confirm("Are you sure Delete ?")){
            return;
        }
        await axios.delete("/api/skills/" + id);
        getSkills();
    }
    //YETENEK SİLME İŞLEMİ



    return <SkillContext.Provider value={{
        skills,
        getSkills,
        storeSkill,
        formValues,
        errors,
        onChangeInputs,
        updateSkill,
        getUpdateSkill,
        getSkillUpdateData,
        deleteSkills,
        onChangeImage
    }}>{children}</SkillContext.Provider>

}

export default SkillContext;


