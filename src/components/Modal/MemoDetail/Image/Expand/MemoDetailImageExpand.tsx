import { ModalComponentProps } from '@hooks/useParamModal';
import { MemoDetailImageExpandContainer } from './MemoDetailImageExpand.Style';

const MemoDetailImageExpand = ({ props }: ModalComponentProps) => {
  const { imgUrl } = props ?? {};

  return (
    <MemoDetailImageExpandContainer>
      <img src={imgUrl} />
    </MemoDetailImageExpandContainer>
  );
};

export default MemoDetailImageExpand;
