import { ToastMessage } from "../lib/toast_message"

interface Props {
    toasts: ToastMessage[];
}

const Toasts = ({ toasts }: Props) => {
    return <div className="toasts fixed">
      {
        toasts.map((toast, idx) => {
            const color = toast.level === 'error' ? 'red' : 'green';
            return (
                <div key={`${toast.message}-${idx}`} className={ `toast bg-${color}-500/75 text-white p-2 my-2 rounded` }>
                    { toast.message }
                </div>
            );
        })
      }
  </div>;
}

export default Toasts;

