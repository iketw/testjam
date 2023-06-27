import {
  ConnectWallet,
  localWallet,
  metamaskWallet,
  rainbowWallet,
  ThirdwebProvider,
  useWallet,
  Web3Button,
} from '@thirdweb-dev/react-native';
import React from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  return (
    <ThirdwebProvider
      activeChain="goerli"
      supportedWallets={[metamaskWallet(), rainbowWallet(), localWallet()]}>
      <AppInner />
    </ThirdwebProvider>
  );
};

const AppInner = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const textStyles = {
    color: isDarkMode ? Colors.white : Colors.black,
    ...styles.heading,
  };

  const [text, setText] = React.useState('');

  const wallet = useWallet();

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={styles.view}>
        <Text style={textStyles}>React Native thirdweb testjam</Text>

        <View style={{marginBottom: 20}}>
          <ConnectWallet />
        </View>

        <View style={{marginBottom: 20}}>
          <Button
            title="Sign Message"
            onPress={() => {
              wallet
                ?.signMessage('Hello World')
                .then(res => {
                  setText(res);
                })
                .catch(err => {
                  setText(err.message);
                });
            }}
          />
        </View>

        <Web3Button
          connectWalletProps={{
            buttonTitle: 'Let`s connect',
            modalTitle: 'Pick pick',
          }}
          onError={err => {
            setText(err.message);
          }}
          contractAddress="0x2269daD52bb33739318554D8BCa1684001a240d1"
          action={contract => contract?.erc1155.claim(0, 1)}>
          Claim
        </Web3Button>

        <Text>{text}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    height: '100%',
    display: 'flex',
    marginTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default App;
