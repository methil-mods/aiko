package com.methil.aiko.ui.components.onboarding

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.methil.aiko.ui.theme.DarkPurple
import com.methil.aiko.ui.theme.LightestPink

@Composable
fun Y2kButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    val shadowColor = DarkPurple
    val shadowOffset = 4.dp
    
    Box(modifier = modifier) {
        // Hard shadow (solid offset rectangle)
        Box(
            modifier = Modifier
                .matchParentSize()
                .offset(x = shadowOffset, y = shadowOffset)
                .background(shadowColor)
        )
        
        // Main button
        Surface(
            modifier = Modifier
                .matchParentSize()
                .clickable(
                    interactionSource = remember { MutableInteractionSource() },
                    indication = null,
                    onClick = onClick
                ),
            color = LightestPink,
            border = BorderStroke(3.dp, Color(0xFFE0B8FF))
        ) {
            Box(contentAlignment = Alignment.Center) {
                Text(
                    text = text,
                    color = DarkPurple,
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold
                )
            }
        }
    }
}
