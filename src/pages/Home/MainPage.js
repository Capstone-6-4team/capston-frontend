import styled from "@emotion/styled";
import tw from "twin.macro";
import Navigator from '../common/Navigator';

const HomeComponentWrapper = styled.div`
  font-family: "NotoSans-Bold";
${tw`container mx-auto flex my-10`}
`;

function MainPage(){
    return(

        <div class="container max-w-full bg-gray-100 h-200vh">
            <Navigator/>

            {/* <ModalProvider>
                <HomeComponentWrapper>

                </HomeComponentWrapper>
            </ModalProvider> */}

        </div>

    )
}

export default MainPage;