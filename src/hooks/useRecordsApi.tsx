import { useCallback } from "react";
import RecordStructure, {
  RecordStructureWithoutId,
} from "../store/feature/records/types";
import axios from "axios";
import {
  addNewRecordActionCreator,
  deleteRecordActionCreator,
  modifyRecordActionCreator,
} from "../store/feature/records/recordsSlice";
import { useDispatch } from "react-redux";
import {
  hideLoadingActionCreator,
  showLoadingActionCreator,
  updateToastActionCreator,
} from "../store/feature/ui/uiSlice";
import { useNavigate } from "react-router-dom";

interface UseRecordsApiStructure {
  getRecords: () => Promise<RecordStructure[] | undefined>;
  getRecordById: (recordId: string) => Promise<RecordStructure | undefined>;
  deleteRecord: (recordId: string, albumName: string) => Promise<void>;
  addNewRecord: (newRecord: RecordStructureWithoutId) => Promise<void>;
  modifyRecord: (
    newRecord: RecordStructureWithoutId,
    recordId: string,
  ) => Promise<void>;
}

const useRecordsApi = (): UseRecordsApiStructure => {
  const dispatch = useDispatch();
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const getRecords = useCallback(async (): Promise<
    RecordStructure[] | undefined
  > => {
    try {
      dispatch(showLoadingActionCreator());
      const { data } = await axios.get<{ records: RecordStructure[] }>(
        `/records`,
      );

      dispatch(hideLoadingActionCreator());
      return data.records!;
    } catch (error) {
      dispatch(hideLoadingActionCreator());
      dispatch(
        updateToastActionCreator({
          message: `Records not found! 🚫`,
          type: "error",
        }),
      );
    }
  }, [dispatch]);

  const getRecordById = useCallback(
    async (recordId: string): Promise<RecordStructure | undefined> => {
      try {
        dispatch(showLoadingActionCreator());

        const { data } = await axios.get<{ record: RecordStructure }>(
          `/records/${recordId}`,
        );

        dispatch(hideLoadingActionCreator());
        return data.record;
      } catch (error) {
        dispatch(hideLoadingActionCreator());
        dispatch(
          updateToastActionCreator({
            message: `'Record not found!`,
            type: "error",
          }),
        );
        navigate(`/home`);
      }
    },
    [dispatch, navigate],
  );

  const deleteRecord = useCallback(
    async (recordId: string, albumName: string): Promise<void> => {
      try {
        dispatch(showLoadingActionCreator());

        await axios.delete<{
          message: string;
        }>(`/records/${recordId}`);

        dispatch(deleteRecordActionCreator(recordId));

        dispatch(
          updateToastActionCreator({
            message: `'${albumName}' was deleted ✅😍!`,
            type: "success",
          }),
        );

        dispatch(hideLoadingActionCreator());
      } catch {
        dispatch(
          updateToastActionCreator({
            message: `Impossible to delete '${albumName}' ⛔😒...`,
            type: "error",
          }),
        );

        dispatch(hideLoadingActionCreator());
      }
    },
    [dispatch],
  );

  const addNewRecord = useCallback(
    async (newRecord: RecordStructureWithoutId): Promise<void> => {
      try {
        dispatch(showLoadingActionCreator());
        const {
          data: { record },
        } = await axios.post<{
          record: RecordStructure;
        }>(`/records`, newRecord);

        dispatch(addNewRecordActionCreator(record));
        dispatch(hideLoadingActionCreator());
        dispatch(
          updateToastActionCreator({
            message: `'${newRecord.albumName} of ${newRecord.bandName}' was created ✅😍!`,
            type: "success",
          }),
        );
        navigate("/home");
      } catch (error) {
        dispatch(hideLoadingActionCreator());
        dispatch(
          updateToastActionCreator({
            message: `Impossible to create '${newRecord.albumName} of ${newRecord.bandName}' ⛔😒...`,
            type: "error",
          }),
        );
      }
    },
    [dispatch, navigate],
  );

  const modifyRecord = useCallback(
    async (
      recordData: RecordStructureWithoutId,
      _id: string,
    ): Promise<void> => {
      const newRecord: RecordStructure = { ...recordData, _id };
      try {
        dispatch(showLoadingActionCreator());

        await axios.patch<{
          record: RecordStructure;
        }>(`/records/${_id}`, recordData);

        dispatch(modifyRecordActionCreator(newRecord));
        dispatch(hideLoadingActionCreator());

        dispatch(
          updateToastActionCreator({
            message: `'${newRecord.albumName} of ${newRecord.bandName}' was modified ✅😍!`,
            type: "success",
          }),
        );
        navigate("/home");
      } catch (error) {
        dispatch(hideLoadingActionCreator());

        dispatch(
          updateToastActionCreator({
            message: `Impossible to modify '${newRecord.albumName} of ${newRecord.bandName}' ⛔😒...`,
            type: "error",
          }),
        );
      }
    },
    [dispatch, navigate],
  );

  return {
    getRecords,
    getRecordById,
    deleteRecord,
    addNewRecord,
    modifyRecord,
  };
};

export default useRecordsApi;
