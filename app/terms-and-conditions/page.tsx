'use client'

import { UIEvent, useState } from 'react'
import { BaseLine, Button } from '@/components'
import { poppins } from '@/utils'

const Page = (): JSX.Element => {
  const [isEnable, setIsEnable] = useState<boolean>(false)

  const onScroll = (event: UIEvent<HTMLDivElement>): void => {
    event.stopPropagation()
    const e = event.target as HTMLDivElement
    const bottom = Math.floor(e.scrollHeight - e.scrollTop) === e.clientHeight

    setIsEnable(bottom)
  }

  return (
    <section className='w-full max-w-6xl mx-auto bg-dark-tertiary p-10'>
      <BaseLine
        title='Terms and Conditions'
        styles='p-4 bg-dark-slate rounded-lg h-fit'
        isCenterTitle={true}
      >
        <div
          className='bg-white text-left overflow-auto no-scrollbar h-5/6'
          onScroll={(event) => onScroll(event)}
        >
          <article
            className={`p-6 text-dark-primary space-y-6 ${poppins.className}`}
          >
            <p>
              Beatae tempore dolorem sequi ratione dolorem hic voluptatem sit
              ducimus. Quasi aspernatur dolor magnam doloribus nihil molestiae
              delectus excepturi. Et rem dignissimos aliquid maiores qui animi
              molestias voluptatem. Id ipsam enim id perspiciatis ex. Ea
              doloribus et molestiae laboriosam et qui.
            </p>

            <p>
              Beatae tempore dolorem sequi ratione dolorem hic voluptatem sit
              ducimus. Quasi aspernatur dolor magnam doloribus nihil molestiae
              delectus excepturi. Et rem dignissimos aliquid maiores qui animi
              molestias voluptatem. Id ipsam enim id perspiciatis ex. Ea
              doloribus et molestiae laboriosam et qui.
            </p>

            <p>
              Beatae tempore dolorem sequi ratione dolorem hic voluptatem sit
              ducimus. Quasi aspernatur dolor magnam doloribus nihil molestiae
              delectus excepturi. Et rem dignissimos aliquid maiores qui animi
              molestias voluptatem. Id ipsam enim id perspiciatis ex. Ea
              doloribus et molestiae laboriosam et qui.
            </p>

            <p>
              Beatae tempore dolorem sequi ratione dolorem hic voluptatem sit
              ducimus. Quasi aspernatur dolor magnam doloribus nihil molestiae
              delectus excepturi. Et rem dignissimos aliquid maiores qui animi
              molestias voluptatem. Id ipsam enim id perspiciatis ex. Ea
              doloribus et molestiae laboriosam et qui.
            </p>

            <p>
              Beatae tempore dolorem sequi ratione dolorem hic voluptatem sit
              ducimus. Quasi aspernatur dolor magnam doloribus nihil molestiae
              delectus excepturi. Et rem dignissimos aliquid maiores qui animi
              molestias voluptatem. Id ipsam enim id perspiciatis ex. Ea
              doloribus et molestiae laboriosam et qui.
            </p>

            <p>
              Beatae tempore dolorem sequi ratione dolorem hic voluptatem sit
              ducimus. Quasi aspernatur dolor magnam doloribus nihil molestiae
              delectus excepturi. Et rem dignissimos aliquid maiores qui animi
              molestias voluptatem. Id ipsam enim id perspiciatis ex. Ea
              doloribus et molestiae laboriosam et qui.
            </p>

            <p>
              Beatae tempore dolorem sequi ratione dolorem hic voluptatem sit
              ducimus. Quasi aspernatur dolor magnam doloribus nihil molestiae
              delectus excepturi. Et rem dignissimos aliquid maiores qui animi
              molestias voluptatem. Id ipsam enim id perspiciatis ex. Ea
              doloribus et molestiae laboriosam et qui.
            </p>

            <p>
              Beatae tempore dolorem sequi ratione dolorem hic voluptatem sit
              ducimus. Quasi aspernatur dolor magnam doloribus nihil molestiae
              delectus excepturi. Et rem dignissimos aliquid maiores qui animi
              molestias voluptatem. Id ipsam enim id perspiciatis ex. Ea
              doloribus et molestiae laboriosam et qui.
            </p>

            <p>
              Beatae tempore dolorem sequi ratione dolorem hic voluptatem sit
              ducimus. Quasi aspernatur dolor magnam doloribus nihil molestiae
              delectus excepturi. Et rem dignissimos aliquid maiores qui animi
              molestias voluptatem. Id ipsam enim id perspiciatis ex. Ea
              doloribus et molestiae laboriosam et qui.
            </p>

            <p>
              Beatae tempore dolorem sequi ratione dolorem hic voluptatem sit
              ducimus. Quasi aspernatur dolor magnam doloribus nihil molestiae
              delectus excepturi. Et rem dignissimos aliquid maiores qui animi
              molestias voluptatem. Id ipsam enim id perspiciatis ex. Ea
              doloribus et molestiae laboriosam et qui.
            </p>

            <p>
              Beatae tempore dolorem sequi ratione dolorem hic voluptatem sit
              ducimus. Quasi aspernatur dolor magnam doloribus nihil molestiae
              delectus excepturi. Et rem dignissimos aliquid maiores qui animi
              molestias voluptatem. Id ipsam enim id perspiciatis ex. Ea
              doloribus et molestiae laboriosam et qui.
            </p>

            <p>
              Beatae tempore dolorem sequi ratione dolorem hic voluptatem sit
              delectus excepturi. Et rem dignissimos aliquid maiores qui animi
              molestias voluptatem. Id ipsam enim id perspiciatis ex. Ea
              doloribus et molestiae laboriosam et qui.
            </p>
          </article>
        </div>

        <Button
          label='Continue'
          isDisabled={!isEnable}
          styles='mt-10 w-full py-2'
        />
      </BaseLine>
    </section>
  )
}

export default Page
