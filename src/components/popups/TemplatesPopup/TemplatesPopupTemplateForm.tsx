import { useEffect, Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import useAppSelector from "@/store/hooks/useAppSelector";
import useAppDispatch from "@/store/hooks/useAppDispatch";
import { Template, fetchTemplates, setActiveTemplateId } from "@/store/slices/templatesSlice";
import toast, { Toaster } from "react-hot-toast";

import api from "@/utils/api";

import Button from "@/components/ui/Button";

type TemplatesPopupTemplateFormProps = {
  mode: "create" | "use" | "edit";
  setMode: Dispatch<SetStateAction<"create" | "use" | "edit">>;
  onClose?: () => void;
};

interface ITemplateFormInput {
  name: string;
  prompt: string;
  text1?: string;
  text2?: string;
  text3?: string;
  text4?: string;
  text5?: string;
}

const StyledTemplatesPopupTemplateForm = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

const InputWrapper = styled.label`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const InputTitle = styled.div`
  font-size: 14px;
`;

const Input = styled.input`
  padding: 10px;

  font-size: 14px;
  font-weight: 500;

  border-radius: 12px;
  border: 1px solid #e7e7e7;

  &::placeholder {
    opacity: 1;
    color: #919191;
  }
`;

const Textarea = styled(Input).attrs({ as: "textarea" })`
  resize: none;
`;

const Buttons = styled.div`
  display: flex;
  column-gap: 40px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const ContentTop = styled.div`
  display: flex;
  gap: 20px;
  font-size: 14px;
`;

const ContetnVar = styled.span`
  width: 100px;
`;

const ContentItem = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const ContentName = styled.div`
  width: 100px;
  flex-shrink: 0;
`;

const ContentData = styled.div`
  display: flex;
  align-items: center;
  height: 42px;
`;

const TemplatesPopupTemplateForm = ({
  mode,
  setMode,
  onClose,
}: TemplatesPopupTemplateFormProps) => {
  const dispatch = useAppDispatch();
  const { activeTemplateId, user: userTemplates } = useAppSelector((store) => store.templates);

  const [currText, setCurrText] = useState([null, null, null, null, null]);

  const [text1, setText1] = useState<string | null>(null);
  const [text2, setText2] = useState<string | null>(null);
  const [text3, setText3] = useState<string | null>(null);
  const [text4, setText4] = useState<string | null>(null);
  const [text5, setText5] = useState<string | null>(null);

  const form = useForm<ITemplateFormInput>();

  useEffect(() => {
    if (activeTemplateId === null || mode !== "edit") {
      return;
    }

    const template = userTemplates.find((template) => template.id === activeTemplateId);
    if (template !== undefined) {
      form.setValue("name", template.name);
      form.setValue("prompt", template.prompt);
    }
  }, [activeTemplateId, userTemplates, form, mode]);

  const onSubmit = ({ name, prompt }: ITemplateFormInput) => {
    if (currText[0] != null && !text1) {
      return;
    }
    if (currText[1] != null && !text2) {
      return;
    }
    if (currText[2] != null && !text3) {
      return;
    }
    if (currText[3] != null && !text4) {
      return;
    }
    if (currText[4] != null && !text5) {
      return;
    }
    if (mode === "create") {
      api
        .post("templates", { json: { name, prompt, text1, text2, text3, text4, text5 } })
        .then((res) => {
          dispatch(fetchTemplates());
          toast.success("Шаблон создан.");
          return res.json();
        })
        .then((data) => {
          if (typeof data == "object") {
            const obj: Template = {
              id: 0,
              name: "",
              prompt: "",
              text1: "",
              text2: "",
              text3: "",
              text4: "",
              text5: "",
              ...data,
            };
            dispatch(setActiveTemplateId(obj.id));
          }
        });

      form.reset();
    }

    if (mode === "edit") {
      api.put(`templates/${activeTemplateId}`, { json: { name, prompt } }).then(() => {
        dispatch(fetchTemplates());
      });

      setMode("use");
    }
  };

  const close = () => {
    dispatch(setActiveTemplateId(null));
    if (onClose) {
      onClose();
    }
  };

  const findText = (text: string) => {
    const resultArray = Array(5).fill(null);

    const regex = /\[TEXT([1-5])?\]/g;
    let matches;
    matches = regex.exec(text);
    regex.lastIndex = 0;

    while ((matches = regex.exec(text)) !== null) {
      const index = parseInt(matches[1]);
      if (!resultArray[index - 1] && index) {
        resultArray[index - 1] = matches[0];
      } else if (!index) {
        resultArray[0] = matches[0];
      }
    }
    setCurrText(resultArray);
  };

  return (
    <StyledTemplatesPopupTemplateForm onSubmit={form.handleSubmit(onSubmit)}>
      <Toaster position="top-center" reverseOrder={false} />
      <InputWrapper>
        <InputTitle>Название:</InputTitle>
        <Input type="text" placeholder="Название" {...form.register("name", { required: true })} />
      </InputWrapper>
      <InputWrapper>
        <InputTitle>Промт:</InputTitle>
        <Textarea
          rows={5}
          placeholder="Промт"
          {...form.register("prompt", { required: true })}
          onChange={(e) => findText(e.target.value)}
        />
      </InputWrapper>
      <div>
        {currText[0] || currText[1] || currText[2] || currText[3] || currText[4] ? (
          <ContentWrapper>
            <ContentTop>
              <ContetnVar>Переменная</ContetnVar>
              <span>Содержимое</span>
            </ContentTop>

            <ContentItem>
              <ContentName>{`[TEXT1]`}</ContentName>
              {!currText[0] ? (
                <ContentData>Не используется в вашем шаблоне</ContentData>
              ) : (
                <Input
                  type="text"
                  {...form.register("text1", { required: false })}
                  onChange={(e) => setText1(e.target.value)}
                />
              )}
            </ContentItem>
            <ContentItem>
              <ContentName>{`[TEXT2]`}</ContentName>
              {!currText[1] ? (
                <ContentData>Не используется в вашем шаблоне</ContentData>
              ) : (
                <Input
                  type="text"
                  {...form.register("text2", { required: false })}
                  onChange={(e) => setText2(e.target.value)}
                />
              )}
            </ContentItem>
            <ContentItem>
              <ContentName>{`[TEXT3]`}</ContentName>
              {!currText[2] ? (
                <ContentData>Не используется в вашем шаблоне</ContentData>
              ) : (
                <Input
                  type="text"
                  {...form.register("text3", { required: false })}
                  onChange={(e) => setText3(e.target.value)}
                />
              )}
            </ContentItem>
            <ContentItem>
              <ContentName>{`[TEXT4]`}</ContentName>
              {!currText[3] ? (
                <ContentData>Не используется в вашем шаблоне</ContentData>
              ) : (
                <Input
                  type="text"
                  {...form.register("text4", { required: false })}
                  onChange={(e) => setText4(e.target.value)}
                />
              )}
            </ContentItem>
            <ContentItem>
              <ContentName>{`[TEXT5]`}</ContentName>
              {!currText[4] ? (
                <ContentData>Не используется в вашем шаблоне</ContentData>
              ) : (
                <Input
                  type="text"
                  {...form.register("text5", { required: false })}
                  onChange={(e) => setText5(e.target.value)}
                />
              )}
            </ContentItem>
          </ContentWrapper>
        ) : null}
      </div>
      <Buttons>
        {mode === "create" && (
          <>
            <Button style={{ flexGrow: 1 }} type="submit">
              Создать
            </Button>
            <Button style={{ flexGrow: 1 }} $outlined onClick={close}>
              Отмена
            </Button>
          </>
        )}
        {mode === "edit" && (
          <>
            <Button style={{ flexGrow: 1 }} type="submit">
              Изменить
            </Button>
            <Button onClick={() => setMode("use")} $outlined style={{ flexGrow: 1 }} type="button">
              Отмена
            </Button>
          </>
        )}
      </Buttons>
    </StyledTemplatesPopupTemplateForm>
  );
};

export default TemplatesPopupTemplateForm;
