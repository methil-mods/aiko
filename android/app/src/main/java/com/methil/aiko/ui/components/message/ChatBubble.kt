package com.methil.aiko.ui.components.message

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.methil.aiko.R
import com.methil.aiko.ui.screens.Message
import com.methil.aiko.ui.theme.*

@Composable
fun ChatBubble(message: Message) {
    val shadowColor = DarkPurple
    val shadowOffset = 4.dp

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 4.dp),
        horizontalAlignment = if (message.isAiko) Alignment.Start else Alignment.End
    ) {
        Box(
            modifier = Modifier
                .padding(
                    start = if (message.isAiko) 0.dp else 40.dp,
                    end = if (message.isAiko) 40.dp else 0.dp
                )
        ) {
            // Hard shadow
            Box(
                modifier = Modifier
                    .matchParentSize()
                    .offset(
                        x = if (message.isAiko) shadowOffset else -shadowOffset,
                        y = shadowOffset
                    )
                    .background(shadowColor)
            )

            // Bubble Surface
            Surface(
                modifier = Modifier
                    .padding(
                        start = if (message.isAiko) 0.dp else shadowOffset,
                        end = if (message.isAiko) shadowOffset else 0.dp,
                        bottom = shadowOffset
                    ),
                color = LightestPink,
                border = BorderStroke(2.dp, LightViolet)
            ) {
                Row(
                    modifier = Modifier.padding(12.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Image(
                        painter = painterResource(id = R.drawable.e_girl_pp),
                        contentDescription = "Profile Picture",
                        modifier = Modifier
                            .size(45.dp),
                        contentScale = ContentScale.Crop
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = message.text,
                        color = DarkPurple,
                        fontSize = 16.sp
                    )
                }
            }

            // Tail/Arrow - Positioned at bottom corner based on sender
            val tailResId =
                if (message.isAiko) R.drawable.msg_arrow_left else R.drawable.msg_arrow_right
            Image(
                painter = painterResource(id = tailResId),
                contentDescription = null,
                modifier = Modifier
                    .size(20.dp)
                    .align(if (message.isAiko) Alignment.BottomStart else Alignment.BottomEnd)
                    .offset(
                        x = if (message.isAiko) (-8).dp else 8.dp,
                        y = (-8).dp
                    )
            )
        }
    }
}
