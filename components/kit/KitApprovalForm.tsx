'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { approveKitAction, type KitApprovalState } from '@/app/actions/kit';
import { CopyButton } from '@/components/kit/CopyButton';

const initial: KitApprovalState = { status: 'idle' };

export function KitApprovalForm({ token }: { token: string }) {
  const [state, formAction] = useFormState(approveKitAction, initial);

  if (state.status === 'sent') {
    return (
      <div className="kit-result" role="status">
        {state.emailed ? (
          <p className="ok">
            <CheckCircle2 size={20} aria-hidden="true" /> Le lien d’accès a été envoyé à{' '}
            <strong>{state.email}</strong>.
          </p>
        ) : (
          <p className="warn">
            <AlertCircle size={20} aria-hidden="true" /> L’email n’a pas pu partir. Transmettez
            ce lien manuellement (email, WhatsApp) à <strong>{state.email}</strong> :
          </p>
        )}
        <div className="kit-link">
          <code>{state.link}</code>
          <CopyButton text={state.link} label="Copier le lien" />
        </div>
      </div>
    );
  }

  return (
    <form action={formAction}>
      <input type="hidden" name="t" value={token} />
      {state.status === 'error' ? (
        <p className="warn" role="alert">
          <AlertCircle size={20} aria-hidden="true" /> {state.message}
        </p>
      ) : null}
      <Submit />
    </form>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-gold" disabled={pending}>
      <Send size={16} aria-hidden="true" />
      {pending ? 'Envoi…' : 'Confirmer et envoyer le kit'}
    </button>
  );
}
