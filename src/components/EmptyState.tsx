import React from 'react';
import { Plus, AlertCircle } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText: string;
  onAction: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  onAction
}) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <AlertCircle size={48} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <button className="primary-btn" onClick={onAction}>
        <Plus size={20} />
        {actionText}
      </button>
    </div>
  );
};

export default EmptyState;
