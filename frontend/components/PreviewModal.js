import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';

const PreviewModal = ({ visible, onClose, htmlContent }) => {
  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View className="flex-1 bg-white">
        <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-200">
          <Text className="text-lg font-bold">Preview</Text>
          <TouchableOpacity onPress={onClose}>
            <Text className="text-indigo-600 font-medium">Close</Text>
          </TouchableOpacity>
        </View>

        <WebView
          originWhitelist={['*']}
          source={{ html: htmlContent }}
          style={{ flex: 1 }}
        />
      </View>
    </Modal>
  );
};

export default PreviewModal;
