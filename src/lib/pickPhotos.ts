import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export async function pickPhotos(camera: boolean, multi: boolean): Promise<string[]> {
  const perm = camera
    ? await ImagePicker.requestCameraPermissionsAsync()
    : await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!perm.granted) {
    Alert.alert('Permission needed', 'Allow access in your phone settings to add photos.');
    return [];
  }
  const opts: ImagePicker.ImagePickerOptions = { quality: 0.7, allowsMultipleSelection: multi && !camera, selectionLimit: 4 };
  const res = camera ? await ImagePicker.launchCameraAsync(opts) : await ImagePicker.launchImageLibraryAsync(opts);
  return res.canceled ? [] : res.assets.map(a => a.uri);
}
