import React, { useState, useEffect, lazy, Suspense } from 'react'
import axios from 'axios'
import Header from '../components/Header'
import styles from '../styles/DietPage/DietPage.module.css'
import { withoutAuth } from '../components/SessionVerification/AuthChecking'
import { Button1 } from '../components/Button'
import { useContext } from 'react'
import { AuthContext } from '../components/SessionVerification/AuthContext'
import useModal from '../components/ModalComponents/useModal'
import Modal from '../components/ModalComponents/Modal'
import { useNavigate } from 'react-router-dom'
const Diet = () => {
  const navigate = useNavigate()

  //diet data
  const { dietData } = useContext(AuthContext)
  const { userData } = useContext(AuthContext)

  // useEffect(() =>{
  //   getDietaryData();
  // },[])

  const [dietaryPreferences, setDietaryPreferences] = useState(null)
  // const [checkedDivContent, setCheckedDivContent] = useState(null)
  useEffect(() => {
    if (dietData) {
      setDietaryPreferences(
        dietData.msg.map(preference => preference.dietary_preference_name)
      )
    }
    // setCheckedDivContent(dietaryPreferences)
  }, [dietData])

  const [diet, setDiet] = useState([])
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/dietary/get-all')
      setDiet(response.data) // do something with the data
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  function waitForCheckedDivContent () {
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        const checkedDivs = document.querySelectorAll('div#checked')
        if (checkedDivs.length > 0) {
          clearInterval(interval)
          const contentArray = []
          checkedDivs.forEach(div => {
            contentArray.push(div.querySelector('p').innerHTML)
          })
          const transformedData = {
            dietaryPreference: contentArray
          }
          resolve(transformedData)
        } else if (checkedDivs.length === 0) {
          clearInterval(interval)
          setError(true)
          reject(new Error('No checked div elements found'))
        }
      }, 100)
    })
  }

  const updateDietPreference = async () => {
    try {
      const data = await waitForCheckedDivContent().catch(error => {
        console.log(error.message)
      })

      if (!data) {
        console.log(
          'No checked div elements found. Skipping updateDietPreference.'
        )

        return
      }

      const response = await fetch(
        `http://localhost:3000/update-dietary-preference/${userData.user.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }
      )

      if (response.ok) {
        console.log('Data sent successfully.')
        toggle()
      } else {
        console.error(
          'Failed to send data:',
          response.status,
          response.statusText
        )
      }
    } catch (error) {
      console.error('Error while sending data:', error)
    }
  }

  const diet_description = {
    0: { description: 'Consuming both animal and plant-based food.' },
    1: {
      description:
        'Excluding meat, fish, and poultry from the diet, but may include dairy and eggs.'
    },
    2: {
      description:
        'Avoiding all animal-based products including meat, dairy, eggs, and honey.'
    },
    3: {
      description: 'Following a vegetarian diet but including fish and seafood.'
    },
    4: {
      description:
        'Primarily vegetarian, but may occasionally eat meat or fish.'
    },
    5: {
      description:
        'Based on the diet of our hunter-gatherer ancestors, excluding grains, dairy, and processed foods.'
    },
    6: {
      description:
        'A high-fat, low-carb diet that puts the body in a state of ketosis, resulting in weight loss.'
    },
    7: {
      description:
        'Emphasizing whole foods, fruits, vegetables, legumes, and healthy fats such as olive oil and nuts.'
    },
    8: {
      description:
        'Avoiding foods that contain gluten, a protein found in wheat, barley, and rye.'
    },
    9: {
      description:
        'Excluding all dairy products, including milk, cheese, and yogurt.'
    },
    10: {
      description:
        'Restricting carbohydrate intake to promote weight loss and manage blood sugar levels.'
    },
    11: {
      description:
        'Limiting the intake of fat, particularly saturated and trans fats.'
    },
    12: {
      description:
        'Focusing on consuming foods that are rich in protein to support muscle growth and repair.'
    },
    13: {
      description:
        'Eating uncooked and unprocessed foods that are rich in nutrients and enzymes.'
    },
    14: {
      description:
        'Plant-based diet consisting of fruits, nuts, seeds, and other harvestable plant-based foods.'
    }
  }

  const combinedData = diet.map((item, index) => ({
    ...item,
    description: diet_description[index].description
  }))

  const DietCard = lazy(() => import('../components/DietCard'))

  const { isShowing, toggle } = useModal()

  const [error, setError] = useState(false)

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.dietCard}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.text}>
              <Modal
                isShowing={isShowing}
                hide={toggle}
                btnMsg={'Confirm'}
                title={'Success'}
                modalMsg={'User dietary preferences updated successfully'}
                closeable={false}
                titleIcon={<i className="fa-solid fa-circle-check"></i>}
                btnFn={() => {
                  window.location.href = '/'
                  // navigate('/', { replace: true })
                }}
              />
              <Modal
                isShowing={error}
                hide={() => ''}
                btnMsg={'Close'}
                title={'Error'}
                modalMsg={'You have to choose atlease one diet preference'}
                closeable={false}
                titleIcon={<i className="fa-solid fa-circle-xmark"></i>}
                btnFn={() => {
                  setError(false)
                }}
              />

              <h1>
                Select Your Diet Plan (you can change this later in your user
                setting)
              </h1>
              <div>
                <div className={styles.dietCardContainer}>
                  {combinedData.map(diet_plan => (
                    <div key={diet_plan.name}>
                      <Suspense fallback={<div>Loading...</div>}>
                        <DietCard
                          title={diet_plan.name}
                          description={diet_plan.description}
                          data={dietaryPreferences}
                        />
                      </Suspense>
                    </div>
                  ))}
                  <div keyword="place_holder"></div>
                </div>
              </div>
              <div className={styles.dietBtn}>
                <Button1
                  type={'button'}
                  options={'Save'}
                  fn={() => {
                    updateDietPreference()
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withoutAuth(Diet)
