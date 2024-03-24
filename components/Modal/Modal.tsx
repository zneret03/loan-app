import {
  HTMLAttributes,
  ReactNode,
  createContext,
  useContext,
  useState
} from 'react'
import { X } from 'react-feather'

interface ModalProviderTypes {
  toggle: boolean
  onToggle: () => void
}

export const ModalContext = createContext<ModalProviderTypes>({
  toggle: false,
  onToggle: () => {}
})

type ChildrenTypes = {
  children: ReactNode
  className?: string
}

interface ModalTypes {
  children: ReactNode
  styles: string
}

export const ModalProvider = ({ children }: ChildrenTypes): JSX.Element => {
  const [toggle, setToggle] = useState<boolean>(false)

  const onToggle = (): void => setToggle((prevState) => !prevState)

  return (
    <ModalContext.Provider value={{ onToggle, toggle }}>
      {children}
    </ModalContext.Provider>
  )
}

const title = ({ children, className }: ChildrenTypes): JSX.Element => (
  <h1 className={className}>{children}</h1>
)

const content = ({
  children,
  className,
  ...rest
}: ChildrenTypes & HTMLAttributes<HTMLDivElement>): JSX.Element => (
  <section className={className} {...rest}>
    {children}
  </section>
)

const footer = ({ children, className }: ChildrenTypes): JSX.Element => (
  <section className={className}>{children}</section>
)

export const Modal = ({ children, styles }: ModalTypes): JSX.Element => {
  const { toggle, onToggle } = useContext(ModalContext)

  return (
    <>
      {toggle ? (
        <main className='relative z-10'>
          <div className='fixed inset-0 bg-primary/50 transition-opacity'></div>

          <section className='fixed inset-0 z-10 w-screen overflow-y-auto flex flex-col items-center justify-center'>
            <div
              className={`p-8 rounded-lg text-dark-primary shadow-sm ${styles}`}
            >
              <div
                onClick={onToggle}
                className='float-right cursor-pointer fill-dark-primary'
              >
                <X />
              </div>
              {children}
            </div>
          </section>
        </main>
      ) : null}
    </>
  )
}

Modal.title = title
Modal.content = content
Modal.footer = footer
